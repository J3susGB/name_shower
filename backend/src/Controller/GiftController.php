<?php

namespace App\Controller;

use App\Entity\Gift;
use App\Repository\GiftRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class GiftController extends AbstractController
{

    #[Route('/api/gifts', name: 'api_gifts_list', methods: ['GET'])]
    public function list(GiftRepository $repo): JsonResponse
    {
        $gifts = $repo->findAllOrdered();

        $data = array_map(fn(Gift $gift) => [
            'id' => $gift->getId(),
            'nombre' => $gift->getNombre(),
            'unidad' => $gift->getUnidad(),
            'precio' => $gift->getPrecio(),
            'enlace' => $gift->getEnlace(),
            'comprador' => $gift->getComprador(),
            'reservado' => $gift->isReservado(),
        ], $gifts);

        return $this->json($data);
    }

    #[Route('/api/gifts/reservar/{id}', name: 'api_gifts_reservar', methods: ['POST'])]
    public function reservar(int $id, Request $request, GiftRepository $repo, EntityManagerInterface $em): JsonResponse
    {
        $gift = $repo->find($id);

        if (!$gift) {
            return $this->json(['error' => 'Regalo no encontrado'], 404);
        }

        if ($gift->isReservado()) {
            return $this->json(['error' => 'Este regalo ya está reservado'], 400);
        }

        $data = json_decode($request->getContent(), true);
        if (!isset($data['comprador']) || empty(trim($data['comprador']))) {
            return $this->json(['error' => 'Debe indicar el nombre del comprador'], 400);
        }

        $gift->setComprador($data['comprador']);
        $gift->setReservado(true);

        $em->persist($gift);
        $em->flush();

        return $this->json(['message' => 'Regalo reservado correctamente']);
    }

    #[Route('/api/admin/gifts', name: 'api_gifts_create', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (!isset($data['nombre'], $data['unidad'], $data['precio'], $data['enlace'])) {
            return $this->json(['error' => 'Faltan datos obligatorios'], 400);
        }

        try {
            $gift = new Gift();
            $gift->setNombre($data['nombre']);
            $gift->setUnidad((int) $data['unidad']);
            $gift->setPrecio((float) $data['precio']); // 🔥 fuerza float
            $gift->setEnlace($data['enlace']);
            $gift->setReservado(false);
            $gift->setComprador(null);

            $em->persist($gift);
            $em->flush();

            return $this->json(['message' => 'Regalo creado correctamente']);
        } catch (\Throwable $e) {
            return $this->json([
                'error' => 'Error interno al crear el regalo',
                'detalle' => $e->getMessage(),
                'datos_recibidos' => $data
            ], 500);
        }
    }

    #[Route('/api/admin/gifts/{id}', name: 'api_gifts_delete', methods: ['DELETE'])]
    public function delete(int $id, GiftRepository $repo, EntityManagerInterface $em): JsonResponse
    {
        $gift = $repo->find($id);

        if (!$gift) {
            return $this->json(['error' => 'Regalo no encontrado'], 404);
        }

        $em->remove($gift);
        $em->flush();

        return $this->json(['message' => 'Regalo eliminado correctamente']);
    }
}
