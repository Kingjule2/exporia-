<?php

namespace App\Filament\Resources\Products\Pages;

use App\Filament\Resources\Products\ProductResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;
use BackedEnum;

use Filament\Schemas\Schema;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;

class ProductImages extends EditRecord
{
    protected static string $resource = ProductResource::class;

    protected static ?string $title = 'images';

    protected static string|BackedEnum|null $navigationIcon = "heroicon-c-photo";

    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                SpatieMediaLibraryFileUpload::make('images')
                    ->labels(false)
                    ->image()
                    ->multiple()
                    ->openable()
                    ->panelLayout('grid')
                    ->collection('images')
                    ->reorderable()
                    ->appendFiles()
                    ->preserveFilenames()
                    ->columnSpan(2)
            ]);
    }

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
