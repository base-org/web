---
title: Onchain Registry API
slug: /tools/registry-api
description: Documentation for the Onchain Registry API.
hide_table_of_contents: true
---

# [Beta] Onchain Registry API

---

:::info

La URL base para nuestros endpoints de API es [https://base.org/api/registry/](https://base.org/api/registry/). Por favor, tenga en cuenta que esta API aún está en beta y no debe usarse en entornos de producción. El uso de la API de Onchain Registry está regido por los términos de licencia descritos en nuestros [Términos y Condiciones](#terms--conditions).

:::

## Instrucciones

1. Los usuarios de esta API pueden usar los endpoints `/entries` y `/featured` para mostrar entradas del Onchain Registry en sus propias superficies
2. Si su equipo desea usar códigos de referencia para dirigir a sus usuarios a las entradas, recomendamos agregar su código de referencia al enlace proporcionado en el campo `target_url`
3. Si su equipo desea filtrar entradas según dónde están alojadas o por creador, recomendamos implementar lógica basada en los campos `target_url` y `creator_name`

## Endpoints

### GET /entries

Este endpoint mostrará todas las entradas del Onchain Registry sujetas a cualquier parámetro de consulta establecido a continuación

#### Parámetros de Consulta

| Nombre   | Tipo   | Descripción                                                                                                    |
| :------- | :----- | :------------------------------------------------------------------------------------------------------------- |
| page     | number | El número de página (por defecto 1)                                                                            |
| limit    | number | El número de entradas por página (por defecto 10)                                                              |
| category | array  | La categoría o categorías de las entradas de interés <br/> (Opciones: Games, Social, Creators, Finance, Media) |
| curation | string | El nivel de curación de la entrada <br/> (Opciones: Featured, Curated, Community)                                |

#### Respuesta

```{
    "data": [
        {
            "id": "7AsRdN8uf601fCkH1e084F",
            "category": "Creators",
            "content": {
                "title": "Based Project",
                "short_description": "Short description of this based project with max char count of 30",
                "full_description": "Full description of this based project with max char count of 200",
                "image_url": "https://base.org/image.png",
                "target_url": "https://base.org/target-page",
                "cta_text": "Mint",
                "function_signature": "mint(uint256)",
                "contract_address": "0x1FC10ef15E041C5D3C54042e52EB0C54CB9b710c",
                "token_id": "2",
                "token_amount": "0.01",
                "curation": "featured",
                "creator_name": "Base",
                "creator_image_url": "https://base.org/creator-image.png"
            }
        },
        {
            "id": "8fRbdN8uf601fCkH1e084F",
            "category": "Games",
            "content": {
                "title": "Based Project II",
                "short_description": "Short description of this second based project with max char count of 30",
                "full_description": "Full description of this second based project with max char count of 200",
                "image_url": "https://base.org/image2.png",
                "target_url": "https://base.org/second-target-page",
                "cta_text": "Mint",
                "function_signature": "mint(uint256)",
                "contract_address": "0x1FC10ef15E041C5D3C54042e52EB0C54CB9b710c",
                "token_id": "1",
                "token_amount": "0.005",
                "curation": "community",
                "creator_name": "Base",
                "creator_image_url": "https://base.org/creator-image2.png"
            }
        }
    ],
    "pagination": {
        "total_records": 2,
        "current_page": 1,
        "total_pages": 1,
        "limit": 10
    }
}
```

### GET /featured

Este endpoint mostrará una única entrada del Onchain Registry que está siendo destacada activamente

#### Respuesta

```{
    "data": {
        "id": "7AsRdN8uf601fCkH1e084F",
        "category": "Creators",
        "content": {
            "title": "Based Project",
            "short_description": "Short description of this based project with max char count of 30",
            "full_description": "Full description of this based project with max char count of 200",
            "image_url": "https://base.org/image.png",
            "target_url": "https://base.org/target-page",
            "cta_text": "Mint",
            "function_signature": "mint(uint256)",
            "contract_address": "0x1FC10ef15E041C5D3C54042e52EB0C54CB9b710c",
            "token_id": "2",
            "token_amount": "0.01",
            "curation": "featured",
            "creator_name": "Base",
            "creator_image_url": "https://base.org/creator-image.png"
        }
    }
}
```

## Esquema de Entrada

| Nombre             | Tipo   | Descripción                                                                                                                                                                                                    |
| :----------------- | :----- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                 | string | ID único de la entrada                                                                                                                                                                                         |
| category           | string | La categoría de la entrada <br/>(Opciones: Games, Social, Creators, Finance, Media)                                                                                                                             |
| title              | string | El título de la entrada                                                                                                                                                                                        |
| short_description  | string | Versión corta de la descripción de la entrada (máx. 30 caracteres)                                                                                                                                              |
| full_description   | string | Versión completa de la descripción de la entrada (máx. 200 caracteres)                                                                                                                                           |
| image_url          | string | URL de la imagen destacada de la entrada                                                                                                                                                                        |
| target_url         | string | URL para la acción deseada del usuario en la entrada                                                                                                                                                            |
| cta_text           | string | Este es el tipo de acción del usuario para la entrada <br/> (Opciones: Play, Mint, Buy, Trade, Explore)                                                                                                          |
| function_signature | string | La firma de la función asociada con la acción deseada del usuario en el contrato de la entrada                                                                                                                    |
| contract_address   | string | La dirección del contrato asociada con la entrada                                                                                                                                                               |
| token_id           | string | El ID del token si es un ERC-1155                                                                                                                                                                               |
| token_amount       | string | El precio de la acción deseada del usuario en la entrada                                                                                                                                                        |
| curation           | string | El nivel de curación de la entrada <br/> <br/> Opciones: <ul><li>Featured - una entrada por día con colocación superior</li><li>Curated - entradas de la comunidad seleccionadas</li><li>Community - todas las demás entradas de la comunidad</li></ul> |
| creator_name       | string | El nombre del creador de la entrada                                                                                                                                                                              |
| creator_image_url  | string | El logo del creador de la entrada                                                                                                                                                                                |

## Términos y Condiciones

Otorgamos a terceros una licencia no exclusiva, mundial y libre de regalías para usar la API de Onchain Registry únicamente con el propósito de integrarla en sus aplicaciones o servicios. Esta licencia no se extiende a ningún dato o contenido accedido a través de la API de Onchain, que sigue siendo responsabilidad exclusiva del tercero. Al usar la API de Onchain Registry, los terceros aceptan cumplir con nuestros términos de licencia y con cualquier ley y regulación aplicable según lo establecido en los Términos de Servicio de la Plataforma de Desarrolladores de Coinbase. No ofrecemos garantías con respecto a la API de Onchain Registry, y los usuarios aceptan todos los riesgos asociados con su uso. La API de Onchain App Registry es un Producto de Acceso Temprano según la Sección 18 de los [Términos de Servicio de la Plataforma de Desarrolladores de Coinbase](https://www.coinbase.com/legal/developer-platform/terms-of-service) y la [Política de Uso Prohibido de Coinbase](https://www.coinbase.com/legal/prohibited_use), y todos los términos y condiciones allí establecidos rigen su uso de la API de Onchain Registry.