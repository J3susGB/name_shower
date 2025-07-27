<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DefaultController
{
    #[Route('/{any}', name: 'app_frontend', requirements: ['any' => '^(?!api).*$'])]
    public function index(): Response
    {
        return new Response(file_get_contents(__DIR__ . '/../../public/index.html'));
    }
}
