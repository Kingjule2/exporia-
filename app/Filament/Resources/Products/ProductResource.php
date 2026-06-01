<?php

namespace App\Filament\Resources\Products;

use App\Enums\RolesEnum;
use App\Enums\ProductStatusEnum;
use App\Filament\Resources\Products\Pages\CreateProduct;
use App\Filament\Resources\Products\Pages\EditProduct;
use App\Filament\Resources\Products\Pages\ListProducts;
use App\Filament\Resources\Products\Pages\ProductImages;
use App\Filament\Resources\Products\Pages\ProductVariationType;
use App\Filament\Resources\Products\Pages\ProductVariations;
use App\Models\Product;
use Filament\Forms;
use Filament\Schemas\Schema;
use Filament\Resources\Resource;
use Filament\Resources\Pages\Page;
use Filament\Pages\Enums\SubNavigationPosition;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\SpatieMediaLibraryImageColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\RichEditor;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use BackedEnum;

class ProductResource extends Resource
{
    protected static ?string $model = Product::class;

    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-shopping-bag';

    protected static ?SubNavigationPosition $subNavigationPosition = SubNavigationPosition::End;

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()->forVendor();
    }

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->required()
                    ->maxLength(255)
                    ->live(onBlur: true)
                    ->afterStateUpdated(function (string $operation, $state, callable $set) {
                        $set("slug", Str::slug($state));
                    }),

                TextInput::make('slug')
                    ->required()
                    ->maxLength(255),

                Select::make('departemen_id')
                    ->relationship('departemen', 'name')
                    ->label('Departemen')
                    ->required()
                    ->reactive()
                    ->afterStateUpdated(function (callable $set) {
                        $set('category_id', null);
                    }),

                Select::make('category_id')
                    ->relationship(
                        name: 'category',
                        titleAttribute: 'name',
                        modifyQueryUsing: function (Builder $query, callable $get) {
                            $departemenId = $get('departemen_id');
                            if ($departemenId) {
                                $query->where('departemen_id', $departemenId);
                            }
                        }
                    )
                    ->label('Category')
                    ->required(),

                RichEditor::make('description')
                    ->columnSpanFull(),

                TextInput::make('price')
                    ->numeric()
                    ->prefix('IDR')
                    ->required(),

                TextInput::make('quantity')
                    ->integer()
                    ->default(0),

                Select::make('status')
                    ->options(ProductStatusEnum::labels())
                    ->default(ProductStatusEnum::Draft->value)
                    ->required(),

                SpatieMediaLibraryFileUpload::make('images')
                    ->collection('images')
                    ->maxFiles(1)
                    ->label('Main Product Image')
                    ->image()
                    ->imageEditor()
                    ->conversion('thumb'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                SpatieMediaLibraryImageColumn::make('images')
                    ->collection('images')
                    ->conversion('thumb')
                    ->label('Image')
                    ->circular(),

                TextColumn::make('title')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('departemen.name')
                    ->label('Departemen')
                    ->sortable(),

                TextColumn::make('category.name')
                    ->label('Category')
                    ->sortable(),

                TextColumn::make('price')
                    ->money('IDR')
                    ->sortable(),

                TextColumn::make('status')
                    ->badge()
                    ->colors(ProductStatusEnum::colors()),

                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                SelectFilter::make('departemen_id')
                    ->relationship('departemen', 'name')
                    ->label('Filter Departemen'),
                SelectFilter::make('status')
                    ->options(ProductStatusEnum::labels()),
            ])
            ->actions([
                \Filament\Actions\EditAction::make(),
                \Filament\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                \Filament\Actions\BulkActionGroup::make([
                    \Filament\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListProducts::route('/'),
            'create' => CreateProduct::route('/create'),
            'edit' => EditProduct::route('/{record}/edit'),
            'images' => ProductImages::route('/{record}/images'),
            'variation_type' => ProductVariationType::route('/{record}/variation-type'),
            'variations' => ProductVariations::route('/{record}/variations'),
        ];
    }

    public static function getRecordSubNavigation(Page $page): array
    {
        return $page->generateNavigationItems([
            EditProduct::class,
            ProductImages::class,
            ProductVariationType::class,
            ProductVariations::class
        ]);
    }

    public static function canViewAny(): bool
    {
        /** @var \App\Models\User */
        $user = Auth::user();
        return $user && ($user->hasRole(RolesEnum::Vendor) || $user->hasRole(RolesEnum::Admin));
    }
}