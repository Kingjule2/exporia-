<?php

namespace App\Filament\Resources\Products\Pages;

use App\Filament\Resources\Products\ProductResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;
use BackedEnum;
use Illuminate\Database\Eloquent\Model;

use Filament\Schemas\Schema;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Section;

class ProductVariations extends EditRecord
{
    protected static string $resource = ProductResource::class;

    protected static ?string $title = 'Variations';

    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-clipboard-document-list';

    public function form(Schema $schema): Schema
    {
        $variationTypes = $this->record->variationTypes;
        $fields = [];

        foreach ($variationTypes as $i => $variationType) {
            $fields[] = TextInput::make('variation_type_' . $variationType->id . '.name')
                ->label($variationType->name)
                ->disabled();
        }

        $fields[] = TextInput::make('price')
            ->numeric()
            ->prefix('IDR')
            ->required();

        $fields[] = TextInput::make('quantity')
            ->integer()
            ->required();

        return $schema
            ->schema([
                Repeater::make('variations')
                    ->label(false)
                    ->schema($fields)
                    ->addable(false)
                    ->deletable(false)
                    ->columns(count($fields))
            ]);
    }

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }

    protected function handleRecordUpdate(Model $record, array $data): Model
    {
        $variations = $data['variations'] ?? [];

        foreach ($variations as $variationData) {
            $optionIds = collect($variationData)
                ->filter(fn($value, $key) => str_starts_with($key, 'variation_type_'))
                ->map(fn($option) => $option['id'])
                ->values()
                ->toArray();

            $record->variations()->updateOrCreate(
                ['variation_type_option_ids' => $optionIds],
                [
                    'price' => $variationData['price'],
                    'quantity' => $variationData['quantity'],
                ]
            );
        }

        return $record;
    }

    protected function mutateFormDataBeforeFill(array $data): array
    {
        $data['variations'] = $this->mergeCartesianWithExisting($this->record->variationTypes);

        return $data;
    }

    private function mergeCartesianWithExisting($variationTypes): array
    {
        $defaultQuantity = $this->record->quantity;
        $defaultPrice = $this->record->price;
        $cartesianProduct = $this->cartesianProduct($variationTypes, $defaultPrice, $defaultQuantity);

        $existingVariations = $this->record->variations->toArray();
        $mergeResult = [];

        foreach ($cartesianProduct as $product) {
            $optionIds = collect($product)
                ->filter(fn($value, $key) => str_starts_with($key, 'variation_type_'))
                ->map(fn($option) => $option['id'])
                ->values()
                ->toArray();

            $match = array_filter($existingVariations, function ($existingEntry) use ($optionIds) {
                return $existingEntry['variation_type_option_ids'] === $optionIds;
            });

            if (!empty($match)) {
                $existingEntry = reset($match);
                $product['quantity'] = $existingEntry['quantity'];
                $product['price'] = $existingEntry['price'];
            }

            $mergeResult[] = $product;
        }

        return $mergeResult;
    }

    private function cartesianProduct($variationTypes, $defaultPrice = null, $defaultQuantity = null): array
    {
        $result = [[]];

        foreach ($variationTypes as $variationType) {
            $temp = [];

            foreach ($variationType->options as $option) {
                foreach ($result as $combination) {
                    $newCombination = $combination + [
                        'variation_type_' . $variationType->id => [
                            'id' => $option->id,
                            'name' => $option->name,
                            'label' => $variationType->name,
                        ]
                    ];

                    $temp[] = $newCombination;
                }
            }

            $result = $temp;
        }

        foreach ($result as &$combination) {
            if (count($combination) === count($variationTypes)) {
                $combination['price'] = $defaultPrice;
                $combination['quantity'] = $defaultQuantity;
            }
        }

        return $result;
    }
}
