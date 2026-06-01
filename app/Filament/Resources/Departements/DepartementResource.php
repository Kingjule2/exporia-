<?php

namespace App\Filament\Resources\Departements;

use App\Filament\Resources\Departements\Pages\CreateDepartement;
use App\Filament\Resources\Departements\Pages\EditDepartement;
use App\Filament\Resources\Departements\Pages\ListDepartements;
use App\Filament\Resources\Departements\Schemas\DepartementForm;
use App\Filament\Resources\Departements\Tables\DepartementsTable;
use App\Models\Departemen;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Checkbox;
use Illuminate\Support\Str;
use App\Enums\RolesEnum;
use Illuminate\Support\Facades\Auth;

class DepartementResource extends Resource
{
    protected static ?string $model = Departemen::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $recordTitleAttribute = 'Departement';

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->required()
                    ->live(onBlur: true)
                    ->afterStateUpdated(fn($set, ?string $state) => $set('slug', Str::slug($state))),
                TextInput::make('slug')
                    ->required(),
                Checkbox::make('active')
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->sortable()
                    ->searchable()

            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                //
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
        return [
            RelationManagers\CategoriesRelationManager::class
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListDepartements::route('/'),
            'create' => CreateDepartement::route('/create'),
            'edit' => EditDepartement::route('/{record}/edit'),
        ];
    }

    public static function canViewAny(): bool
    {
        /** @var \App\Models\User */
        $user = Auth::user();
        return $user && $user->hasRole(RolesEnum::Admin);
    }
}
