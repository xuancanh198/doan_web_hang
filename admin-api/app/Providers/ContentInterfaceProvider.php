<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Enums\InterfaceEnums;

class ContentInterfaceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {

        $repositories = array_merge(InterfaceEnums::REPOSITORY_LINK, InterfaceEnums::SERVICES_LINK);

        foreach ($repositories as $interface => $repository) {
            $this->app->bind($interface, $repository);
        }
    }
}
