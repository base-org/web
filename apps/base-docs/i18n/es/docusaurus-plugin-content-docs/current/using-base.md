---
title: Using Base
sidebar_position: 1
slug: /using-base
description: 'How to integrate Base with popular wallets like Coinbase Wallet and MetaMask, covering both mainnet and testnet configurations.'
keywords:
  [
    'Base',
    'Base wallet',
    'Coinbase Wallet',
    'MetaMask',
    'EVM-compatible wallets',
    'network configuration',
    'Base mainnet',
    'Base testnet',
    'Sepolia',
    'cryptocurrency wallet setup',
    'Base wallet setup',
    'add Base network',
  ]
hide_table_of_contents: true
---

# Usando Base con tu billetera

---

## Coinbase Wallet

La extensión del navegador [Coinbase Wallet](https://chrome.google.com/webstore/detail/coinbase-wallet-extension/hnfanknocfeofbddgcijnmhnfnkdnaad?hl=en) proporciona soporte para Base por defecto.

Para usar Base con Coinbase Wallet:

1. Abre la extensión del navegador Coinbase Wallet e inicia sesión en tu cuenta.
2. Conéctate a una aplicación usando Coinbase Wallet.
3. Abre el menú de selección de red haciendo clic en el ícono de red en la esquina superior derecha.
4. Selecciona **Base**.

Tu red activa ahora debería estar cambiada a Base.

---

## Otras billeteras

Base se puede agregar como una red personalizada a cualquier billetera compatible con EVM (es decir, [MetaMask](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn)).

### MetaMask

Para agregar Base como una red personalizada a MetaMask:

1. Abre la extensión del navegador MetaMask.
2. Abre el menú desplegable de selección de red haciendo clic en el botón desplegable en la parte superior de la extensión.
3. Haz clic en el botón **Agregar red**.
4. Haz clic en **Agregar una red manualmente**.
5. En el cuadro de diálogo **Agregar una red manualmente** que aparece, ingresa la siguiente información para la mainnet de Base:

| Nombre            | Valor                                                        |
   | :-------------- | :----------------------------------------------------------- |
   | Nombre de la Red | Base Mainnet                                                 |
   | Descripción      | La mainnet pública para Base.                                |
   | Punto de acceso RPC | [https://mainnet.base.org](https://mainnet.base.org)         |
   | ID de Cadena     | 8453                                                         |
   | Símbolo de Moneda | ETH                                                          |
   | Explorador de Bloques | [https://base.blockscout.com/](https://base.blockscout.com/) |

6. Toca el botón Guardar para guardar Base como una red.

Ahora deberías poder conectarte a Base seleccionándola desde el menú desplegable de selección de red.

---

## Testnet

#### La extensión del navegador Coinbase Wallet proporciona soporte para la testnet de Base Sepolia por defecto.

Para usar Base Sepolia con Coinbase Wallet:

1. Abre la extensión del navegador Coinbase Wallet e inicia sesión en tu cuenta.
2. Conéctate a una aplicación usando Coinbase Wallet.
3. Abre el menú de selección de red haciendo clic en el ícono de red en la esquina superior derecha.
4. Haz clic en el botón **Más redes**.
5. Navega a la pestaña **Testnets**.
6. Selecciona **Base Sepolia**.

Tu red activa ahora debería estar cambiada a la testnet de Base.

#### Otras billeteras

Base Sepolia se puede agregar como una red personalizada a cualquier billetera compatible con EVM (es decir, [MetaMask](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn)).

#### MetaMask

Para agregar Base Sepolia como una red personalizada a MetaMask:

1. Abre la extensión del navegador MetaMask.
2. Abre el menú desplegable de selección de red haciendo clic en el botón desplegable en la parte superior de la extensión.
3. Haz clic en el botón **Agregar red**.
4. Haz clic en **Agregar una red manualmente**.
5. En el cuadro de diálogo **Agregar una red manualmente** que aparece, ingresa la siguiente información para la testnet de Base Sepolia:

| Nombre            | Sepolia                                                                |
   | :-------------- | :--------------------------------------------------------------------- |
   | Nombre de la Red | Base Sepolia                                                           |
   | Punto de acceso RPC | [https://sepolia.base.org](https://sepolia.base.org)                   |
   | ID de Cadena     | 84532                                                                  |
   | Símbolo de Moneda | ETH                                                                    |
   | Explorador de Bloques | [https://sepolia-explorer.base.org](https://sepolia-explorer.base.org) |

6. Toca el botón Guardar para guardar Base Sepolia como una red.

Ahora deberías poder conectarte a la testnet de Base seleccionándola desde el menú desplegable de selección de red.

---