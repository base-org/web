---
title: Fees
slug: /fees
description: Documentation about network fees on Base. This page covers details of the two-component cost system involving L2 execution fees and L1 security fees, and offers insights on fee variations and cost-saving strategies.
keywords:
  [
    Base fees,
    transaction fees,
    network fees,
    Base network fees,
    L2 execution fee,
    L1 security fee,
    transaction costs,
    gas fees,
    fee calculation,
    cost-saving,
    transaction timing,
    fee variations,
    Base platform,
  ]
hide_table_of_contents: true
---

Tarifas

¿Cómo funcionan las tarifas de red en Base?

Cada transacción en Base consta de dos costos: una tarifa L2 (ejecución) y una tarifa L1 (seguridad). La tarifa L2 es el costo de ejecutar tu transacción en la L2, y la tarifa L1 es el costo estimado de publicar la transacción en la L1. Típicamente, la tarifa de seguridad L1 es más alta que la tarifa de ejecución L2.

La tarifa L1 variará dependiendo de la cantidad de transacciones en la L1. Si el momento de tu transacción es flexible, puedes ahorrar costos enviando transacciones durante períodos de menor gas en la L1 (por ejemplo, durante el fin de semana).

De manera similar, la tarifa L2 puede aumentar y disminuir dependiendo de cuántas transacciones se estén enviando a la L2. Este mecanismo de ajuste tiene la misma implementación que la L1; puedes leer más sobre ello [aquí](https://help.coinbase.com/en/coinbase/getting-started/crypto-education/eip-1559).

Para obtener detalles adicionales sobre el cálculo de tarifas en Base, consulta la [documentación para desarrolladores del op-stack](https://community.optimism.io/docs/developers/build/transaction-fees/).