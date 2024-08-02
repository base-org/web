---
title: Adding tokens to Coinbase Wallet
slug: /tokens/wallet
description: 'A simple step by step guide to ensure ERC-20 tokens show immediately on Coinbase Wallet once deployed.'
keywords:
  [
    'ERC-20',
    'token',
    'memecoin',
    'Base',
    'Coinbase Wallet',
    'build on base',
    'tokens',
    'token issuer',
    'meme coin',
    'swaps',
  ]
hide_table_of_contents: true
---

# Cómo asegurar que los tokens ERC-20 sean intercambiables inmediatamente en Coinbase Wallet

Esta página está destinada a desarrolladores que hayan desplegado recientemente contratos de tokens ERC-20 en Base Mainnet y deseen que los detalles de sus tokens se muestren lo más rápido posible en Coinbase Wallet.

Coinbase Wallet hace que cualquier token ERC-20 esté disponible para intercambio instantáneamente segundos después de que se despliegue el contrato.

Siga las instrucciones a continuación para asegurarse de que el logotipo de su token, el nombre del activo y otros metadatos también aparezcan en Coinbase Wallet.

:::info Aviso
Base no respalda ningún token específico que se despliegue en mainnet y esté disponible para intercambio.
:::

---

## Agregar su token a la lista

Los pasos a continuación explican cómo hacer que su token se muestre rápidamente en Coinbase Wallet. Estas instrucciones funcionan no solo para Base, sino para cualquier cadena EVM compatible con Coinbase Wallet (Optimism, Arbitrum, Polygon, Avalanche, Fantom, BNB).

### Paso 1: Despliegue su Token ERC-20 en Base Mainnet

Escriba y despliegue un contrato inteligente de token ERC-20 compatible. Pruébelo y luego despliegue en Base Mainnet.

Una vez que su contrato ERC-20 esté desplegado, su activo será intercambiable instantáneamente en Coinbase Wallet en el flujo de intercambio. Los usuarios pueden buscar por dirección de contrato o nombre del activo. Vea a continuación para obtener información sobre cómo mostrar gráficos de precios y otros metadatos.

### Paso 2: Prepare sus metadatos e imágenes de activos

Prepare una imagen de alta resolución del logotipo de su token. Asegúrese de que sea clara, identificable y representativa de su token.

### Paso 3: Liste su criptomoneda en un agregador de listados
##### **Nota:** En este momento, estar listado y verificado en CoinMarketCap es la mejor manera de asegurar que el nombre, la imagen y el gráfico de precios de su token aparezcan en Coinbase Wallet.

Puede pagar para ser listado Y **verificado** en CoinMarketCap siguiendo estas [instrucciones](https://support.coinmarketcap.com/hc/en-us/articles/360043659351-Listings-Criteria).

Puede listar de forma gratuita en CoinGecko siguiendo estas [instrucciones](https://support.coingecko.com/hc/en-us/articles/7291312302617-How-to-list-new-cryptocurrencies-on-CoinGecko).

Una vez que CoinGecko liste su token O CoinMarketCap lo liste como **_verificado_**, el logotipo de la imagen de su activo y otros metadatos fluirán hacia Coinbase Wallet y podrán ser vistos por los usuarios. **Puede tomar de 24 a 48 horas para que los cambios de metadatos se actualicen.**

## ¿Por qué mi token se muestra en la sección “Tokens más nuevos”?

Los tokens que se lanzan recientemente y no han tenido un volumen de comercio significativo aparecen en esta sección. Una vez que su token alcance una capitalización de mercado de al menos $10M en CoinGecko o CoinMarketCap, la etiqueta de **token más nuevo** dentro de Coinbase Wallet se eliminará.

## ¿Por qué no hay un gráfico de precios para mi token?

Su token debe estar listado y marcado como verificado en CoinMarketCap para que el gráfico de precios se muestre en Coinbase Wallet.

Si la guía anterior no resuelve su problema, por favor envíe más información utilizando este [Deform](https://app.deform.cc/form/a331da5a-447b-43e8-b636-ea3b925e115a/).

# Compartir su token
### Enlaces de comercio personalizados
Al compartir un enlace único a la página de su activo, su comunidad puede interactuar más fácilmente con su token.

Cómo obtener su enlace personalizado:

**Paso 1:** Obtenga su enlace personalizado para su token navegando a la página del activo en Coinbase Wallet

**Paso 2:** Haga clic en el botón de compartir

:::info Aviso
Los nuevos activos con baja liquidez pueden resultar en intercambios fallidos o pueden resultar en que un usuario reciba menos del token de destino debido al deslizamiento. Una responsabilidad importante del creador del token es comunicar estos riesgos a la comunidad.
:::