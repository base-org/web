---
title: Structs Exercise
description: Exercise - Demonstrate your knowledge of structs.
hide_table_of_contents: false
---

Create a contract that adheres to the following specifications.

---

## Contract

Create a contract called `GarageManager`. Add the following in storage:

- A public mapping called `garage` to store a list of `Car`s (described below), indexed by address

Add the following types and functions.

### Car Struct

Implement a `struct` called `Car`. It should store the following properties:

- `make`
- `model`
- `color`
- `numberOfDoors`

### Add Car Garage

Add a function called `addCar` that adds a car to the user's collection in the `garage`. It should:

- Use `msg.sender` to determine the owner
- Accept arguments for make, model, color, and number of doors, and use those to create a new instance of `Car`
- Add that `Car` to the `garage` under the user's address

### Get All Cars for the Calling User

Add a function called `getMyCars`. It should return an array with all of the cars owned by the calling user.

### Get All Cars for Any User

Add a function called `getUserCars`. It should return an array with all of the cars for any given `address`.

### Update Car

Add a function called `updateCar`. It should accept a `uint` for the index of the car to be updated, and arguments for all of the `Car` types.

If the sender doesn't have a car at that index, it should revert with a custom `error` `BadCarIndex` and the index provided.

Otherwise, it should update that entry to the new properties.

### Reset My Garage

Add a public function called `resetMyGarage`. It should delete the entry in `garage` for the sender.

---

### Submit your Contract and Earn an NFT Badge! (BETA)

import data from "../../assets/deployments/StructsUT.json";
import CafeUnitTest from '../../../src/components/CafeUnitTest/index.jsx'

<CafeUnitTest deployment={data} nftNum={7}/>
