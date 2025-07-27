<?php

// src/Entity/Gift.php
namespace App\Entity;

use App\Repository\GiftRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: GiftRepository::class)]
class Gift
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $nombre = null;

    #[ORM\Column(type: 'integer')]
    private ?int $unidad = 1;

    #[ORM\Column(type: 'decimal', precision: 10, scale: 2)]
    private ?float $precio = null;

   #[ORM\Column(length: 1024)]
    private ?string $enlace = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $comprador = null;

    #[ORM\Column(type: 'boolean')]
    private bool $reservado = false;

    // Getters y setters...

    public function getId(): ?int { return $this->id; }
    public function getNombre(): ?string { return $this->nombre; }
    public function setNombre(string $nombre): static { $this->nombre = $nombre; return $this; }

    public function getUnidad(): ?int { return $this->unidad; }
    public function setUnidad(int $unidad): static { $this->unidad = $unidad; return $this; }

    public function getPrecio(): ?float { return $this->precio; }
    public function setPrecio(float $precio): static { $this->precio = $precio; return $this; }

    public function getEnlace(): ?string { return $this->enlace; }
    public function setEnlace(string $enlace): static { $this->enlace = $enlace; return $this; }

    public function getComprador(): ?string { return $this->comprador; }
    public function setComprador(?string $comprador): static { $this->comprador = $comprador; return $this; }

    public function isReservado(): bool { return $this->reservado; }
    public function setReservado(bool $reservado): static { $this->reservado = $reservado; return $this; }
}
