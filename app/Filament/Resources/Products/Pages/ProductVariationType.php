<?php

namespace App\Filament\Resources\Products\Pages;

use App\Filament\Resources\Products\ProductResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;
use BackedEnum;

use Filament\Schemas\Schema;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Select;
use App\Enums\ProductVarianTypeEnum;

class ProductVariationType extends EditRecord
{
    protected static string $resource = ProductResource::class;

    protected static ?string $title = 'Product Variation Type';

    protected static string|BackedEnum|null $navigationIcon = 'heroicon-m-numbered-list';

    public function form(Schema $schema): Schema
    {
        return $schema
            ->schema([
                Repeater::make('variationTypes')
                    ->label(false)
                    ->relationship()
                    ->collapsible()
                    ->defaultItem(1)
                    ->addActionLabel('Add new variation type')
                    ->columns(2)
                    ->columnSpan(2)
                    ->schema([
                        TextInput::make('name')
                            ->required(),
                        Select::make('type')
                            ->options(ProductVarianTypeEnum::labels())
                            ->required(),
                        Repeater::make('options')
                            ->relationship()
                            ->collapsible()
                            ->schema([
                                TextInput::make('name')
                                    ->columnSpan(2)
                                    ->required(),
                                SpatieMediaLibraryFileUpload::make('images')
                                    ->image()
                                    ->multiple()
                                    ->openable()
                                    ->panelLayout('grid')
                                    ->collection('images')
                                    ->reorderable()
                                    ->appendFiles()
                                    ->preserveFilenames()
                                    ->columnSpan(3)
                            ])
                            ->columnSpan(2)
                    ])
            ]);
    }

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
