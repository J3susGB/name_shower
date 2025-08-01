<?php

namespace App\Controller;

use App\Entity\Prediction;
use App\Repository\PredictionRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class PredictionController extends AbstractController
{
    #[Route('/api/predicciones', name: 'api_predicciones_store', methods: ['POST'])]
    public function store(Request $request, EntityManagerInterface $em): JsonResponse
    {
        try {
            $data = json_decode($request->getContent(), true);

            if (!$data || !isset($data['nombreAutor'], $data['sexoPredicho'], $data['nombreNino'], $data['nombreNina'])) {
                return $this->json(['status' => 'error', 'message' => 'Datos incompletos'], 400);
            }

            $prediction = new Prediction();
            $prediction->setNombreAutor($data['nombreAutor']);
            $prediction->setSexoPredicho($data['sexoPredicho']);
            $prediction->setNombreNino($data['nombreNino']);
            $prediction->setNombreNina($data['nombreNina']);
            $prediction->setNombreNino2($data['nombreNino2'] ?? null);
            $prediction->setNombreNina2($data['nombreNina2'] ?? null);
            $prediction->setFecha(new \DateTimeImmutable('now', new \DateTimeZone('Europe/Madrid')));

            $em->persist($prediction);
            $em->flush();

            return $this->json([
                'status' => 'success',
                'message' => 'Predicción guardada correctamente'
            ]);
        } catch (\Throwable $e) {
            // Opcional: escribir el error en un log si lo necesitas
            // file_put_contents('var/log/dev.log', $e->getMessage() . "\n" . $e->getTraceAsString(), FILE_APPEND);

            return $this->json([
                'status' => 'error',
                'message' => 'Error interno: ' . $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ], 500);
        }
    }

    #[Route('/api/admin/predicciones', name: 'api_predicciones_index', methods: ['GET'])]
    public function index(PredictionRepository $repo): JsonResponse
    {
        $predictions = $repo->findBy([], ['fecha' => 'DESC']);

        $data = array_map(fn($p) => [
            'id' => $p->getId(),
            'nombreAutor' => $p->getNombreAutor(),
            'sexoPredicho' => $p->getSexoPredicho(),
            'nombreNino' => $p->getNombreNino(),
            'nombreNina' => $p->getNombreNina(),
            'fecha' => $p->getFecha()->format('Y-m-d H:i:s'),
        ], $predictions);

        return $this->json($data);
    }

    #[Route('/api/predicciones/estadisticas', name: 'api_predicciones_estadisticas', methods: ['GET'])]
    public function estadisticas(PredictionRepository $repository): JsonResponse
    {
        $predicciones = $repository->findAll();

        $combinaciones = [
            'Niños' => 0,
            'Niñas' => 0,
            'Niño y niña' => 0
        ];

        $nombresNino = [];
        $nombresNina = [];

        foreach ($predicciones as $p) {
            $sexo = $p->getSexoPredicho();
            if (isset($combinaciones[$sexo])) {
                $combinaciones[$sexo]++;
            }

            foreach ([$p->getNombreNino(), $p->getNombreNino2()] as $nino) {
                if ($nino) {
                    $nombre = ucfirst(strtolower(trim($nino)));
                    $nombresNino[$nombre] = ($nombresNino[$nombre] ?? 0) + 1;
                }
            }

            foreach ([$p->getNombreNina(), $p->getNombreNina2()] as $nina) {
                if ($nina) {
                    $nombre = ucfirst(strtolower(trim($nina)));
                    $nombresNina[$nombre] = ($nombresNina[$nombre] ?? 0) + 1;
                }
            }
        }

        arsort($nombresNino);
        arsort($nombresNina);

        return $this->json([
            'status' => 'success',
            'combinaciones' => $combinaciones,
            'nombres_nino' => array_map(fn($nombre, $total) => ['nombre' => $nombre, 'total' => $total], array_keys($nombresNino), $nombresNino),
            'nombres_nina' => array_map(fn($nombre, $total) => ['nombre' => $nombre, 'total' => $total], array_keys($nombresNina), $nombresNina),
        ]);
    }

}
