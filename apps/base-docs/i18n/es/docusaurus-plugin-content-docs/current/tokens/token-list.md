---
title: Bridging an L1 token to Base
slug: /tokens/list
description: How to submit ERC-20 tokens for bridging between Ethereum and Base as a token issuer.
keywords:
  [
    Base Token List,
    ERC-20 tokens,
    Ethereum,
    Base Mainnet,
    Base Bridge,
    token bridging,
    token submission,
    Optimism Superchain,
    token deployment,
    add token to Base,
  ]
hide_table_of_contents: true
---

# La Lista de Tokens Base

Esta página está destinada a los emisores de tokens que ya tienen un contrato ERC-20 desplegado en Ethereum y desean enviar su token para el puente entre Ethereum y Base. Base utiliza la [lista de tokens de Optimism Superchain](https://github.com/ethereum-optimism/ethereum-optimism.github.io) como referencia para los tokens que se han desplegado en Base.

**_Descargo de responsabilidad: Base no respalda ninguno de los tokens que están listados en el repositorio de Github y solo ha realizado verificaciones preliminares, que incluyen verificaciones automáticas listadas_** [**_aquí_**](https://github.com/ethereum-optimism/ethereum-optimism.github.io)**_._**

---

## Agregar tu token a la lista

Los pasos a continuación explican cómo agregar tu token a la Lista de Tokens Base.

### Paso 1: Desplegar tu token en Base

Selecciona tu marco de puente preferido y úsalo para desplegar un ERC-20 para tu token en Base. Te recomendamos que uses el marco proporcionado por los contratos del [puente estándar](https://github.com/ethereum-optimism/specs/blob/main/specs/protocol/bridges.md) de Base, y además despliegues tu token usando la [OptimismMintableERC20Factory](https://docs.base.org/base-contracts/#l2-contract-addresses). Desplegar tu token en Base de esta manera nos proporciona garantías que facilitarán el proceso de aprobación. Si eliges un marco de puente diferente, su interfaz debe ser compatible con la del puente estándar, de lo contrario, puede ser difícil para nosotros brindar soporte.

### Paso 2: Enviar detalles de tu token

Sigue las instrucciones en el [repositorio de GitHub](https://github.com/ethereum-optimism/ethereum-optimism.github.io) y envía un PR que contenga los detalles requeridos para tu token. Debes especificar en el archivo data.json de tu token una sección para ‘base-sepolia' y/o ‘base’. El cambio que necesitas enviar es particularmente simple si tu token ya ha sido agregado a la lista de tokens de Optimism. Por ejemplo, [este PR](https://github.com/ethereum-optimism/ethereum-optimism.github.io/commit/27ab9b2d3388f7feba3a152e0a0748c73d732a68) muestra el cambio requerido para cbETH, que ya estaba en la lista de tokens de Optimism y se basa en el puente estándar de Base.

### Paso 3: Esperar la aprobación final

Las revisiones son realizadas regularmente por el equipo de Base y deberías recibir una respuesta dentro de 24-72 horas (dependiendo de si el PR se abre en un día laborable, fin de semana o festivo).