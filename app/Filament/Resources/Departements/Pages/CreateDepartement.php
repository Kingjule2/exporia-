<?php

namespace App\Filament\Resources\Departements\Pages;

use App\Filament\Resources\Departements\DepartementResource;
use Filament\Resources\Pages\CreateRecord;

class CreateDepartement extends CreateRecord
{
    protected static string $resource = DepartementResource::class;

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }
}
