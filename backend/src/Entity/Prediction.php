<?php

namespace App\Entity;

use App\Repository\PredictionRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PredictionRepository::class)]
class Prediction
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $nombreAutor = null;

    #[ORM\Column(length: 255)]
    private ?string $sexoPredicho = null;

    #[ORM\Column(length: 255)]
    private ?string $nombreNino = null;

    #[ORM\Column(length: 255)]
    private ?string $nombreNina = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $fecha = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $nombreNino2 = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $nombreNina2 = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNombreAutor(): ?string
    {
        return $this->nombreAutor;
    }

    public function setNombreAutor(string $nombreAutor): static
    {
        $this->nombreAutor = $nombreAutor;

        return $this;
    }

    public function getSexoPredicho(): ?string
    {
        return $this->sexoPredicho;
    }

    public function setSexoPredicho(string $sexoPredicho): static
    {
        $this->sexoPredicho = $sexoPredicho;

        return $this;
    }

    public function getNombreNino(): ?string
    {
        return $this->nombreNino;
    }

    public function setNombreNino(string $nombreNino): static
    {
        $this->nombreNino = $nombreNino;

        return $this;
    }

    public function getNombreNina(): ?string
    {
        return $this->nombreNina;
    }

    public function setNombreNina(string $nombreNina): static
    {
        $this->nombreNina = $nombreNina;

        return $this;
    }

    public function getFecha(): ?\DateTimeImmutable
    {
        return $this->fecha;
    }

    public function setFecha(\DateTimeImmutable $fecha): static
    {
        $this->fecha = $fecha;

        return $this;
    }

    public function getNombreNino2(): ?string
    {
        return $this->nombreNino2;
    }

    public function setNombreNino2(?string $nombreNino2): static
    {
        $this->nombreNino2 = $nombreNino2;
        return $this;
    }

    public function getNombreNina2(): ?string
    {
        return $this->nombreNina2;
    }

    public function setNombreNina2(?string $nombreNina2): static
    {
        $this->nombreNina2 = $nombreNina2;
        return $this;
    }

}
