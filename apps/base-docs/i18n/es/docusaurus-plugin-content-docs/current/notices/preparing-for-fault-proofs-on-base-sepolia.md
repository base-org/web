---
title: Preparing for fault proofs on Base Sepolia
slug: /preparing-for-fault-proofs-on-base-sepolia
description: Fault proofs are expected to go live for Base Sepolia testnet in mid-July.
keywords:
  [
    Fault proofs,
    Base,
    L2 decentralization,
    Permissionless output proposals,
    Permissionless challenges,
    Withdrawals,
    Base Sepolia testnet,
    DisputeGameFactory,
    L2OutputOracle,
    Seven-day finalization,
    Dispute game,
    Bridge operators,
    UI updates,
    Contract upgrades,
    Node operators,
    Superbridge,
    Superchain bridges,
    L1 to L2 deposits,
    L2 to L1 withdrawals,
    Mid-July upgrade,
    Ethereum Sepolia,
    Bridging logic,
    Testnet funds,
    Decentralized validation,
    Community participation,
  ]
hide_table_of_contents: true
---

# Preparándose para las pruebas de fallos en Base Sepolia (Testnet)

Las pruebas de fallos son una implementación crucial en el camino de una L2 hacia la descentralización. Permiten un enfoque más descentralizado para validar el estado de la L2 y allanan el camino hacia una mayor participación de la comunidad.

Mejoran la descentralización con dos capacidades importantes:

- **Propuestas de salida sin permisos:** En una L2 sin pruebas de fallos, solo el proponente centralizado puede crear y enviar raíces de salida sobre el estado de la L2. Ahora, con las pruebas de fallos, cualquiera puede hacer afirmaciones sobre el estado actual de Base en lugar de depender de una parte central.
- **Desafíos sin permisos a las propuestas de salida:** Si alguien hace una afirmación errónea o fraudulenta, cualquiera puede desafiarla.

Estos cambios permiten que cualquiera retire fondos de Base a L1 sin tener que depender de actores centralizados.

## Preparándose para las pruebas de fallos

Se espera que las pruebas de fallos se activen para Base Sepolia (Testnet) a mediados de julio.

**Qué está cambiando para los retiros en testnet:**

- Los retiros implicarán probar y finalizar basándose en el sistema de pruebas de fallos.
- Los retiros ya no serán instantáneos: tomarán al menos siete días para finalizar, pero pueden tardar más dependiendo del resultado del juego de disputas correspondiente utilizado.
- El `DisputeGameFactory` reemplazará al `L2OutputOracle` como el nuevo contrato donde se propondrán las afirmaciones de la raíz de salida.

**Si estás en el proceso de retirar tus fondos de testnet de L2 a L1:**

- **Retiros _antes_ de la actualización a mediados de julio** se procesarán instantáneamente.
- **Retiros _durante_ o _después_ de la actualización de pruebas de fallos** para Base Sepolia tomarán al menos siete días para completarse.

Si tu retiro de fondos de testnet de Base Sepolia a Ethereum Sepolia coincide con la actualización que se realizará a mediados de julio, se te pedirá que vuelvas a enviar tu retiro.

**Si tu equipo está operando un puente en Base Sepolia:**

- Por favor, proporciona a tus usuarios un aviso en tu UI para informarles que las pruebas de fallos se habilitarán para Base Sepolia a mediados de julio.
- Por favor, asegúrate de que esté claro para tus usuarios que los retiros de testnet ahora tomarán al menos siete días.
- Evalúa y actualiza tu lógica de puente, y asegúrate de que se estén utilizando los nuevos contratos de L1.

Las actualizaciones de los contratos de pruebas de fallos se completarán de manera atómica, lo que significa que todos los contratos de L1 afectados se actualizarán en una sola transacción. No se requerirá ninguna acción por parte de los operadores de nodos.

Ten en cuenta que bridge.base.org ahora redirige a [Superbridge](https://superbridge.app/base) y otros puentes (colectivamente, "puentes de Superchain"). Los puentes de Superchain están disponibles para iniciar y completar depósitos y retiros hacia y desde Base. Por favor, consulta nuestros [documentos](https://bridge.base.org/deposit) para obtener más información sobre el puente.