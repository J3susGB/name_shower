<?php

namespace App\Repository;

use App\Entity\Gift;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class GiftRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Gift::class);
    }

    /**
     * Devuelve regalos ordenados: primero no reservados (false), luego reservados (true),
     * y dentro de cada grupo por id ascendente.
     *
     * @return Gift[]
     */
    public function findAllOrdered(): array
    {
        return $this->createQueryBuilder('g')
            ->orderBy('g.reservado', 'ASC') // false (0) primero, true (1) después
            ->addOrderBy('g.id', 'ASC')     // dentro del grupo, por id
            ->getQuery()
            ->getResult();
        }
}
