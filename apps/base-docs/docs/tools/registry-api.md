---
title: Onchain Registry API
slug: /tools/registry-api
description: Documentation for the Onchain Registry API.
keywords: [onchain registry, registry API, onchain API, Base registry, Base, Base apps, Base API]
hide_table_of_contents: true
---

# Onchain Registry API

---

:::info

The base url for our API endpoints is [https://base.org/api/registry/](https://base.org/api/registry/). The use of Onchain Registry API is governed by the license terms outlined in our [Terms & Conditions](#terms--conditions).

:::

## Instructions

1. Users of this API can use the `/entries` and `/featured` endpoints to display Onchain Registry entries on their own surfaces
2. If your team would like to use referral codes to point your users to entries, we recommend appending your referral code to the link provided in the `target_url` field
3. If your team would like to filter entries based on where they are hosted or by creator, we recommend implementing logic based on the `target_url` and `creator_name` fields

## Endpoints

### GET /entries

This endpoint will display all Onchain Registry entries subject to any query parameters set below

#### Query Parameters

| Name     | Type   | Description                                                                                                    |
| :------- | :----- | :------------------------------------------------------------------------------------------------------------- |
| page     | number | The page number (default 1)                                                                                    |
| limit    | number | The number of entries per page (default 10)                                                                    |
| category | array  | The category or categories of the entries of interest <br/> (Options: Games, Social, Creators, Finance, Media) |
| curation | string | The entry’s level of curation <br/> (Options: Featured, Curated, Community)                                    |

#### Response

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
                "featured": true,
                "creator_name": "Base",
                "creator_image_url": "https://base.org/creator-image.png",
                "curation": "featured",
                "start_ts": "2024-06-25T04:00:00Z",
                "expiration_ts": "2024-07-29T00:00:00Z"
            },
            "updated_at": null,
            "created_at": "2024-07-10T18:20:42.000Z"
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
                "featured": false,
                "creator_name": "Base",
                "creator_image_url": "https://base.org/creator-image2.png",
                "curation": "community",
                "start_ts": "2024-06-25T04:00:00Z",
                "expiration_ts": "2024-07-29T00:00:00Z"
            },
            "updated_at": "2024-07-11T18:20:42.000Z",
            "created_at": "2024-07-10T18:20:42.000Z"
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

This endpoint will display a single Onchain Registry entry that is being actively featured

#### Response

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
            "featured": true,
            "creator_name": "Base",
            "creator_image_url": "https://base.org/creator-image.png",
            "curation": "featured",
            "start_ts": "2024-06-25T04:00:00Z",
            "expiration_ts": "2024-07-29T00:00:00Z"
        },
        "updated_at": null,
        "created_at": "2024-07-10T18:20:42.000Z"
    }
}
```

## Entry Schema

| Name               | Type             | Description                                                                                                                                                                                                    |
| :----------------- | :--------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                 | string           | Unique entry ID                                                                                                                                                                                                |
| category           | string           | The category of the entry <br/>(Options: Games, Social, Creators, Finance, Media)                                                                                                                              |
| title              | string           | The title of the entry                                                                                                                                                                                         |
| short_description  | string           | Short version of the entry description (max 30 char)                                                                                                                                                           |
| full_description   | string           | Full version of the entry description (max 200 char)                                                                                                                                                           |
| image_url          | string           | URL of the entry’s featured image                                                                                                                                                                              |
| target_url         | string           | URL for the entry’s desired user action                                                                                                                                                                        |
| cta_text           | string           | This is the type of user action for the entry <br/> (Options: Play, Mint, Buy, Trade, Explore)                                                                                                                 |
| function_signature | string           | The function signature associated with the desired user action on the entry’s contract                                                                                                                         |
| contract_address   | string           | The contract address associated with the entry                                                                                                                                                                 |
| token_id           | string           | The token ID if this is an ERC-1155                                                                                                                                                                            |
| token_amount       | string           | The price of the entry’s desired user action                                                                                                                                                                   |
| featured           | boolean          | A true or false based on whether the entry is actively featured                                                                                                                                                |
| creator_name       | string           | The name of the entry’s creator                                                                                                                                                                                |
| creator_image_url  | string           | The logo of the entry’s creator                                                                                                                                                                                |
| curation           | string           | The entry’s level of curation <br/> <br/> Options: <ul><li>Featured - one entry per day with top placement</li><li>Curated - community entries being</li><li>Community - all other community entries</li></ul> |
| start_ts           | string           | The UTC timestamp that the entry is open to users                                                                                                                                                              |
| expiration_ts      | string           | The UTC timestamp that the entry is no longer open to users                                                                                                                                                    |
| updated_at         | string \|\| null | The UTC timestamp that the entry was last updated (null if the entry has not been updated since creation)                                                                                                      |
| created_at         | string           | The UTC timestamp that the entry was created                                                                                                                                                                   |

## Terms & Conditions

We grant third parties a non-exclusive, worldwide, royalty-free license to use the Onchain Registry API solely for the purpose of integrating it into their applications or services. This license does not extend to any data or content accessed through the Onchain API, which remains the sole responsibility of the third party. By using the Onchain Registry API, third parties agree to comply with our license terms and any applicable laws and regulations as set forth in Coinbase Developer Platform Terms of Service. We make no warranties regarding the Onchain Registry API, and users accept all risks associated with its use. The Onchain App Registry API is an Early Access Product per Section 18 of the [Coinbase Developer Platform Terms of Service](https://www.coinbase.com/legal/developer-platform/terms-of-service) and the Coinbase [Prohibited Use Policy](https://www.coinbase.com/legal/prohibited_use), and all terms and conditions therein govern your use of the Onchain Registry API.
