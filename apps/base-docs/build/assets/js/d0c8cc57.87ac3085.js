"use strict";(self.webpackChunk_app_base_docs=self.webpackChunk_app_base_docs||[]).push([[5816],{82247:(e,t,a)=>{a.d(t,{xA:()=>g,yg:()=>m});var n=a(14041);function i(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function r(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?r(Object(a),!0).forEach((function(t){i(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,n,i=function(e,t){if(null==e)return{};var a,n,i={},r=Object.keys(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||(i[a]=e[a]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(i[a]=e[a])}return i}var l=n.createContext({}),c=function(e){var t=n.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},g=function(e){var t=c(e.components);return n.createElement(l.Provider,{value:t},e.children)},d="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var a=e.components,i=e.mdxType,r=e.originalType,l=e.parentName,g=s(e,["components","mdxType","originalType","parentName"]),d=c(a),u=i,m=d["".concat(l,".").concat(u)]||d[u]||p[u]||r;return a?n.createElement(m,o(o({ref:t},g),{},{components:a})):n.createElement(m,o({ref:t},g))}));function m(e,t){var a=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=a.length,o=new Array(r);o[0]=u;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[d]="string"==typeof e?e:i,o[1]=s;for(var c=2;c<r;c++)o[c]=a[c];return n.createElement.apply(null,o)}return n.createElement.apply(null,a)}u.displayName="MDXCreateElement"},10994:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>p,frontMatter:()=>r,metadata:()=>s,toc:()=>c});var n=a(89575),i=(a(14041),a(82247));const r={title:"How Storage Works",description:"An introduction to how storage works in Ethereum",hide_table_of_contents:!1},o=void 0,s={unversionedId:"docs/storage/how-storage-works",id:"docs/storage/how-storage-works",title:"How Storage Works",description:"An introduction to how storage works in Ethereum",source:"@site/base-camp/docs/storage/how-storage-works.md",sourceDirName:"docs/storage",slug:"/docs/storage/how-storage-works",permalink:"/base-camp/docs/storage/how-storage-works",draft:!1,tags:[],version:"current",frontMatter:{title:"How Storage Works",description:"An introduction to how storage works in Ethereum",hide_table_of_contents:!1},sidebar:"docs",previous:{title:"How Storage Works",permalink:"/base-camp/docs/storage/how-storage-works-video"},next:{title:"Storage Exercise",permalink:"/base-camp/docs/storage/storage-exercise"}},l={},c=[{value:"Objectives:",id:"objectives",level:2},{value:"Introduction",id:"introduction",level:2},{value:"Smart Contract Data Storage",id:"smart-contract-data-storage",level:2},{value:"Key-Value Store",id:"key-value-store",level:3},{value:"Types of Storage",id:"types-of-storage",level:3},{value:"Storage",id:"storage",level:4},{value:"Memory",id:"memory",level:4},{value:"Stack",id:"stack",level:4},{value:"Variable Storage",id:"variable-storage",level:2},{value:"Variable Packing",id:"variable-packing",level:3},{value:"Ordering Variable Declarations",id:"ordering-variable-declarations",level:3},{value:"Conclusion",id:"conclusion",level:2},{value:"See Also",id:"see-also",level:2}],g={toc:c},d="wrapper";function p(e){let{components:t,...r}=e;return(0,i.yg)(d,(0,n.A)({},g,r,{components:t,mdxType:"MDXLayout"}),(0,i.yg)("p",null,"In this article, we will delve into the workings of Ethereum storage, explore the nuances of variable declaration ordering, and provide examples of efficient and inefficient storage practices to create optimized smart contracts."),(0,i.yg)("hr",null),(0,i.yg)("h2",{id:"objectives"},"Objectives:"),(0,i.yg)("p",null,"By the end of this lesson you should be able to:"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},"Diagram how a contract's data is stored on the blockchain (Contract -> Blockchain)"),(0,i.yg)("li",{parentName:"ul"},"Order variable declarations to use storage efficiently"),(0,i.yg)("li",{parentName:"ul"},"Diagram how variables in a contract are stored (Variable -> Contract)")),(0,i.yg)("hr",null),(0,i.yg)("h2",{id:"introduction"},"Introduction"),(0,i.yg)("p",null,"Creating smart contracts that can operate efficiently requires a thorough understanding of how storage works in Ethereum. When designing a contract, you need to consider the storage requirements of the contract, including the types of storage needed, the gas costs associated with storage operations, and how to manage storage effectively. Poor storage management practices can lead to bloated contracts that consume excessive gas, making them more expensive to execute. By following best practices for storage management, you'll be equipped to create contracts that are lean, efficient, and cost-effective."),(0,i.yg)("hr",null),(0,i.yg)("h2",{id:"smart-contract-data-storage"},"Smart Contract Data Storage"),(0,i.yg)("h3",{id:"key-value-store"},"Key-Value Store"),(0,i.yg)("p",null,"Smart contracts on Ethereum store and manage data utilizing a key-value store model, where each piece of data is identified by a unique key and accompanied by its corresponding value."),(0,i.yg)("p",null,"In this diagram, the keys (user addresses) are unique identifiers used to index the corresponding values (balances):"),(0,i.yg)("p",null,(0,i.yg)("img",{alt:"Key Value Store",src:a(44831).A,width:"700",height:"525"})),(0,i.yg)("p",null,"This model can be compared to a dictionary or a map where the key serves as the index and the value represents the data associated with that index. However, the key-value store has distinct characteristics that set it apart from these traditional data structures, which make it a more optimal choice for smart contracts on Ethereum."),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},(0,i.yg)("strong",{parentName:"p"},"Simplicity:")," It is simple and straightforward, which allows for easier implementation and maintenance within a contract.")),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},(0,i.yg)("strong",{parentName:"p"},"Scalability:")," It is highly scalable, making it well-suited for managing vast amounts of data typically associated with apps and smart contracts. This scalability helps maintain performance levels even as data storage requirements grow.")),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},(0,i.yg)("strong",{parentName:"p"},"Fixed-size chunks:")," Storing data in fixed-size 32-byte chunks optimizes storage space and ensures that data location calculations are more efficient. This feature is particularly beneficial in the context of Ethereum, where storage costs are a significant concern.")),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},(0,i.yg)("strong",{parentName:"p"},"Efficient storage and retrieval:")," It is optimized for storing and retrieving large volumes of data efficiently, which is essential for quick access to stored information.")),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},(0,i.yg)("strong",{parentName:"p"},"Security and immutability:")," Unlike other storage models that may allow direct data manipulation, key-value stores within Ethereum's environment ensure data integrity and security through transaction-based modifications. This feature aligns with the decentralized and trustless nature of blockchain technology.")),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},(0,i.yg)("strong",{parentName:"p"},"Gas-efficiency:")," In Ethereum, every operation within a smart contract execution consumes gas. The key-value store model is designed to be gas-efficient, minimizing the gas consumption for storage and retrieval operations, thus reducing the overall cost of contract execution.")),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},(0,i.yg)("strong",{parentName:"p"},"Compatibility with decentralized environments:")," It is particularly suitable for decentralized environments, where data consistency, integrity, and security are crucial. The model's design inherently addresses the challenges posed by multi-threaded or concurrent environments where multiple processes or functions may attempt to access or modify the same data simultaneously."))),(0,i.yg)("h3",{id:"types-of-storage"},"Types of Storage"),(0,i.yg)("p",null,"There are three primary types of storage in Ethereum smart contracts: storage, memory, and stack. Each type has its specific use case and characteristics, which make them suitable for different aspects of smart contract execution."),(0,i.yg)("h4",{id:"storage"},"Storage"),(0,i.yg)("p",null,"Storage is the most persistent and expensive form of data storage. Data stored in the contract's storage persists across transaction executions and is accessible to any function within the smart contract. This storage is also visible on the blockchain and can be read by external sources, making it suitable for storing important and long-lasting information related to the contract's state."),(0,i.yg)("p",null,"Key attributes of storage:"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},(0,i.yg)("strong",{parentName:"p"},"Persistent:")," Data remains in storage even after the contract execution finishes, allowing for state continuity across multiple transactions.")),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},(0,i.yg)("strong",{parentName:"p"},"Expensive:")," Storing and modifying data in storage consumes more gas compared to other data locations, making it costly in terms of transaction fees.")),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},(0,i.yg)("strong",{parentName:"p"},"Visible on the blockchain:")," Storage data is publicly available and can be read by external parties."))),(0,i.yg)("p",null,"Consider the following contract:"),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-solidity"},"contract StorageDemo {\n    // Declare a state variable to store data in storage\n    uint256 public storedData;\n\n    // Function to update the storedData variable in storage\n    function updateData(uint256 newData) public {\n        storedData = newData;\n    }\n}\n")),(0,i.yg)("p",null,"The contract includes a state variable called ",(0,i.yg)("inlineCode",{parentName:"p"},"storedData"),", which is stored in the contract's storage. The ",(0,i.yg)("inlineCode",{parentName:"p"},"public")," visibility modifier allows anyone to access this variable. The contract also includes a public function called ",(0,i.yg)("inlineCode",{parentName:"p"},"updateData"),", which can be called by anyone to modify the value of ",(0,i.yg)("inlineCode",{parentName:"p"},"storedData")," in storage."),(0,i.yg)("p",null,"Any changes made to ",(0,i.yg)("inlineCode",{parentName:"p"},"storedData")," in storage will persist across multiple transactions and will be visible to anyone who reads the blockchain. Please note that storage is more expensive than other data locations, so it is important to use it judiciously to minimize gas costs."),(0,i.yg)("h4",{id:"memory"},"Memory"),(0,i.yg)("p",null,"Memory is a temporary and more affordable data location. It's used to save data during the execution of a single transaction. Once the transaction is complete, the memory is wiped clean and any data within it is lost. Memory is suitable for storing intermediate variables and temporary data that does not need to persist across multiple transactions."),(0,i.yg)("p",null,"Key attributes of memory:"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},(0,i.yg)("strong",{parentName:"p"},"Temporary:")," Data in memory is only available during a single transaction execution and is lost afterward.")),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},(0,i.yg)("strong",{parentName:"p"},"Less expensive:")," Saving and modifying data in memory consumes less gas compared to storage, making it more cost-effective for temporary data.")),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},(0,i.yg)("strong",{parentName:"p"},"Not visible on the blockchain:")," Memory data is not accessible to external parties and remains confined to the transaction execution."))),(0,i.yg)("p",null,"Consider the following contract:"),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-solidity"},"contract MemoryDemo {\n    // Declare a state variable to store data in storage\n    uint256 public storedData;\n\n    // Function to update the storedData variable in memory\n    function updateData(uint256 newData) public {\n        // Declare a memory variable to store the new data\n        uint256 tempData = newData;\n\n        // Assign the value of the memory variable to the storage variable\n        storedData = tempData;\n    }\n}\n")),(0,i.yg)("p",null,"In the contract, we declare a memory variable called ",(0,i.yg)("inlineCode",{parentName:"p"},"tempData")," and assign the input parameter ",(0,i.yg)("inlineCode",{parentName:"p"},"newData")," to it to update its value. The ",(0,i.yg)("inlineCode",{parentName:"p"},"tempData")," variable is then assigned to the ",(0,i.yg)("inlineCode",{parentName:"p"},"storedData")," variable to update its value in storage."),(0,i.yg)("p",null,"Unlike storage, data stored in memory is not persisted across transactions and is only accessible during the execution of the function. However, accessing and modifying data in memory is less expensive than doing so in storage, making it a more efficient option when dealing with temporary data. Additionally, any data stored in memory is not visible on the blockchain and cannot be read by external parties."),(0,i.yg)("h4",{id:"stack"},"Stack"),(0,i.yg)("p",null,"The stack is another form of temporary data storage, specifically used for holding function arguments, local variables, and intermediate values during function execution. The stack follows a Last-In-First-Out (LIFO) structure, meaning that the most recently added item is the first to be removed. This storage type is highly efficient but has limited space, making it suitable for small-scale data manipulation during function execution."),(0,i.yg)("p",null,"The stack is an internal data structure used by the EVM (Ethereum Virtual Machine) for computation during the execution of transactions. When a transaction is executed by the EVM, the bytecode of the smart contract is loaded into memory, and the EVM uses the stack to keep track of intermediate results and execute operations."),(0,i.yg)("p",null,"In Solidity, developers do not interact with the stack directly, but can optimize their code to make the best use of it and minimize the amount of gas used during transaction execution. This can include using more efficient algorithms or data structures, or avoiding unnecessary operations that can increase the depth of the stack."),(0,i.yg)("p",null,"Key attributes of the stack:"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},(0,i.yg)("strong",{parentName:"p"},"Temporary:")," Like memory, stack data is only available during a single transaction execution and is lost afterward.")),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},(0,i.yg)("strong",{parentName:"p"},"Highly efficient:")," Stack operations consume minimal gas, making it the most cost-effective storage option for small-scale data manipulation.")),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},(0,i.yg)("strong",{parentName:"p"},"LIFO structure:")," The stack follows the Last-In-First-Out order, which allows for efficient management of function arguments, local variables, and intermediate values.")),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},(0,i.yg)("strong",{parentName:"p"},"Limited space:")," The stack has a maximum depth of 1024, restricting the number of elements it can hold at a given time.")),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},(0,i.yg)("strong",{parentName:"p"},"Limited visibility:")," Only the top 16 elements in the stack are accessible, limiting how many variables and other elements can be in scope at one time."))),(0,i.yg)("p",null,"Let's compare two versions of a function and analyze their gas efficiency with regard to stack usage and gas consumption:"),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-solidity"},"contract GasEfficiencyDemo {\n    uint256 public result;\n\n    // Less efficient\n    function sumLessEfficient(uint256 a, uint256 b) public {\n        uint256 temp = a + b;\n        result = temp;\n    }\n\n    // More efficient\n    function sumMoreEfficient(uint256 a, uint256 b) public {\n        result = a + b;\n    }\n}\n")),(0,i.yg)("p",null,"In the ",(0,i.yg)("inlineCode",{parentName:"p"},"sumLessEfficient")," function, the sum of the two input arguments ",(0,i.yg)("inlineCode",{parentName:"p"},"a")," and ",(0,i.yg)("inlineCode",{parentName:"p"},"b")," is first assigned to the temporary variable ",(0,i.yg)("inlineCode",{parentName:"p"},"temp")," before being assigned to the state variable ",(0,i.yg)("inlineCode",{parentName:"p"},"result"),". This additional step introduces an extra variable on the stack, which requires more gas for stack operations and consumes more gas overall."),(0,i.yg)("p",null,"In contrast, the ",(0,i.yg)("inlineCode",{parentName:"p"},"sumMoreEfficient")," function directly assigns the sum of the input arguments ",(0,i.yg)("inlineCode",{parentName:"p"},"a")," and ",(0,i.yg)("inlineCode",{parentName:"p"},"b")," to the state variable result. This eliminates the need for the temporary variable and reduces the stack usage, leading to lower gas consumption for stack operations and a more gas-efficient execution."),(0,i.yg)("p",null,"Although the difference in gas consumption between these two functions may not be significant for such a simple example, the principle of minimizing stack usage and optimizing code to reduce gas consumption is essential for developing efficient smart contracts. By avoiding unnecessary variables and operations, you can improve the gas efficiency of your functions and reduce the cost of executing them on the EVM."),(0,i.yg)("h2",{id:"variable-storage"},"Variable Storage"),(0,i.yg)("h3",{id:"variable-packing"},"Variable Packing"),(0,i.yg)("p",null,"As we've learned, minimizing the storage footprint of a contract can substantially reduce gas costs. To make storage more efficient, Ethereum employs a concept called variable packing."),(0,i.yg)("p",null,"Variable packing is the process of placing multiple smaller variables into a single storage slot to optimize storage usage. A storage slot is a fixed-size container that can hold up to 32 bytes of data. Ethereum's Solidity compiler automatically packs smaller variables together if they can fit into a single storage slot."),(0,i.yg)("p",null,(0,i.yg)("img",{alt:"Variable Packing",src:a(66218).A,width:"700",height:"700"})),(0,i.yg)("h3",{id:"ordering-variable-declarations"},"Ordering Variable Declarations"),(0,i.yg)("p",null,"When declaring variables in a contract, their order can impact a contract's gas usage. You can optimize storage by declaring variables of similar sizes together, such that they can be packed into the same storage slot."),(0,i.yg)("p",null,"Let's illustrate how this works:"),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-solidity"},"contract StoragePackingExample {\n    uint8 a; // 1 byte\n    uint8 b; // 1 byte\n    uint256 c; // 32 bytes\n}\n")),(0,i.yg)("p",null,"In this example, the compiler will automatically pack ",(0,i.yg)("inlineCode",{parentName:"p"},"a")," and ",(0,i.yg)("inlineCode",{parentName:"p"},"b")," into the same storage slot, as they are both 1-byte variables and can fit into a single 32-byte storage slot. However, ",(0,i.yg)("inlineCode",{parentName:"p"},"c")," requires a separate storage slot due to its size (32 bytes)."),(0,i.yg)("p",null,(0,i.yg)("img",{alt:"Variable Order Optimized",src:a(55827).A,width:"600",height:"429"})),(0,i.yg)("p",null,"If these variables were not in the correct order, the contract would not take advantage of variable packing. The variables would take up more storage and would potentially consume more gas to execute the contract."),(0,i.yg)("p",null,"Let's consider an inefficient example:"),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-solidity"},"contract StoragePackingBadExample {\n    uint8 a; // 1 byte\n    uint256 b; // 32 bytes\n    uint8 c; // 1 byte\n}\n")),(0,i.yg)("p",null,"In this contract, the variables are not declared in the optimal order, and the compiler would store these variables in the following way:"),(0,i.yg)("p",null,(0,i.yg)("img",{alt:"Variable Order Inefficient",src:a(50698).A,width:"500",height:"375"})),(0,i.yg)("p",null,"To make the most of variable packing, it's important to group variables of the same size together and avoid mixing variable sizes. \u200bBy doing this, the compiler can store them more efficiently, reducing the overall storage usage of the contract. This optimization will not only reduce the gas costs associated with storage, but it will also improve the contract's execution speed."),(0,i.yg)("hr",null),(0,i.yg)("h2",{id:"conclusion"},"Conclusion"),(0,i.yg)("p",null,"Creating efficient and optimized smart contracts on Ethereum requires a thorough understanding of how storage works. Smart contracts use a key-value store model to manage and store data, which is simple, scalable, gas-efficient, and suitable for decentralized environments. There are three types of storage in Ethereum smart contracts: storage, memory, and stack, each with specific characteristics. Developers can optimize storage usage by using variable packing and ordering variable declarations based on their size. By following best practices for storage management, developers can create contracts that are lean, efficient, cost-effective, and improve their execution speed."),(0,i.yg)("hr",null),(0,i.yg)("h2",{id:"see-also"},"See Also"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("a",{parentName:"li",href:"https://programtheblockchain.com/posts/2018/03/09/understanding-ethereum-smart-contract-storage/"},"Understanding Ethereum Smart Contract Storage")),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("a",{parentName:"li",href:"https://docs.alchemy.com/docs/smart-contract-storage-layout"},"What is Smart Contract Storage Layout"))))}p.isMDXComponent=!0},44831:(e,t,a)=>{a.d(t,{A:()=>n});const n=a.p+"assets/images/key-value-store-ab99b23b50526467dbff04b23d2d9117.png"},50698:(e,t,a)=>{a.d(t,{A:()=>n});const n=a.p+"assets/images/variable-order-inefficient-3be23afa66d475009b90943e95c3109a.png"},55827:(e,t,a)=>{a.d(t,{A:()=>n});const n=a.p+"assets/images/variable-order-optimized-8249697efd87a215fe4c8d9e12c76f56.png"},66218:(e,t,a)=>{a.d(t,{A:()=>n});const n=a.p+"assets/images/variable-packing-f95b6a9f90119befa64460bd9bef0516.png"}}]);