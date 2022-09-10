module.exports = {
    "openapi": "3.0.1",
    "author": "Vikram Jadhav",
    "info": {
        version: "1.0.0",
        title: "Bluecom Ecom",
        description: "Bluecom Ecom",

        contact: {
            name: "Vikram Jadhav",
            email: "vikramjadhav515@gmail.com"
        }
    },

    components: {
        schemas: {
            fetchItems: {
                type: 'object',
                properties: {
                    categoryId: {
                        type: 'string',
                        example: ""
                    },
                    subCategoryId: {
                        type: 'string',
                        description: "",
                        example: ""
                    },
                    brandId: {
                        type: 'string',
                        description: "",
                        example: ""
                    },
                    itemId: {
                        type: 'string',
                        description: "",
                        example: "35020B80-46AB-4129-8AE9-0020D64E9684"
                    },
                    recordSize: {
                        type: 'number',
                        description: "",
                        example: 10
                    },
                    pageNumber: {
                        type: 'number',
                        description: "",
                        example: 1
                    },
                    sortBy: {
                        type: 'string',
                        description: "",
                        example: 'sort by should be one like new/high/low'
                    },
                    searchText: {
                        type: 'string',
                        description: "",
                        example: 'lenovo'
                    }
                }
            },
            fetchFilteredItems: {
                type: 'object',
                properties: {
                    minRate: {
                        type: 'number',
                        example: 2000
                    },
                    maxRate: {
                        type: 'number',
                        description: "",
                        example: 50000
                    }
                }
            },
            registerUser: {
                type: 'object',
                properties: {
                    email: {
                        type: 'string',
                        example: "abc@gmail.com"
                    },
                    password: {
                        type: 'string',
                        description: "",
                        example: ""
                    }
                }
            },
            login: {
                type: 'object',
                properties: {
                    userName: {
                        type: 'string',
                        example: "abc@gmail.com"
                    },
                    password: {
                        type: 'string',
                        description: "",
                        example: ""
                    }
                }
            },
            upsert: {
                type: 'object',
                properties: {
                    itemId: {
                        type: 'string',
                        example: "580DFEB6-A0FC-490C-911B-068C41E92893"
                    },
                    customerId: {
                        type: 'string',
                        description: "",
                        example: "D1BBEFD6-8068-49C7-9CB1-CAB7485A6346"
                    },
                    quantity: {
                        type: 'number',
                        description: "",
                        example: "D1BBEFD6-8068-49C7-9CB1-CAB7485A6346"
                    },
                    type: {
                        type: 'string',
                        description: "",
                        example: "any one from - new/delete/shift"
                    }
                }
            },
            cart: {
                type: 'object',
                properties: {
                    customerId: {
                        type: 'string',
                        description: "",
                        example: "D1BBEFD6-8068-49C7-9CB1-CAB7485A6346"
                    },
                    type: {
                        type: 'string',
                        description: "",
                        example: "any one from - cart/wish"
                    }
                }
            },
            upsertAddress: {
                type: 'object',
                properties: {
                    addressId: {
                        type: 'string',
                        description: "",
                        example: "FE7C94B5-93AE-418A-8716-4B4B5FC2BCC2"
                    },
                    customerId: {
                        type: 'string',
                        description: "",
                        example: "D1BBEFD6-8068-49C7-9CB1-CAB7485A6346"
                    },
                    addressLine: {
                        type: 'string',
                        description: "",
                        example: "test"
                    },
                    pinCode: {
                        type: 'string',
                        description: "",
                        example: "400011"
                    },
                    cityID: {
                        type: 'string',
                        description: "",
                        example: "79F67DB3-DB6C-4417-A68A-CC281A2FCC0A"
                    },
                    landMark: {
                        type: 'string',
                        description: "",
                        example: "test"
                    },
                    addressType: {
                        type: 'string',
                        description: "",
                        example: "Delivery/Billing Address"
                    },
                    receiverName: {
                        type: 'string',
                        description: "",
                        example: "Vikram"
                    },
                    isDefault: {
                        type: 'number',
                        description: "",
                        example: "1/0"
                    },
                    recordStatus: {
                        type: 'number',
                        description: "",
                        example: "1"
                    }
                }
            },
            productReview: {
                type: 'object',
                properties: {
                    itemId: {
                        type: 'string',
                        description: "",
                        example: "35020B80-46AB-4129-8AE9-0020D64E9684"
                    },
                    customerId: {
                        type: 'string',
                        description: "",
                        example: "D1BBEFD6-8068-49C7-9CB1-CAB7485A6346"
                    },
                    reviewText: {
                        type: 'string',
                        description: "",
                        example: "test"
                    },
                    rating: {
                        type: 'number',
                        description: "",
                        example: 5
                    },
                    visitorName: {
                        type: 'string',
                        description: "",
                        example: "vikram"
                    },
                    visitorEmail: {
                        type: 'string',
                        description: "",
                        example: "vikram@gmail.com"
                    }
                }
            },
            Success: {
                type: 'object',
                properties: {
                    timeStamp: {
                        type: 'string',
                        description: "2022-04-21",
                    },
                    message: {
                        type: 'string',
                        description: "Records found",
                    },
                    data: {
                        type: 'array',
                        description: "[{}]",
                    }
                }
            },
            Input: {
                type: 'object',
                properties: {
                    timeStamp: {
                        type: 'string',
                        description: "2022-04-21",
                    },
                    message: {
                        type: 'string',
                        description: "Records found",
                    }
                    // title: {
                    //     type: 'string',
                    //     description: "Todo's title",
                    //     example: "Coding in JavaScript"
                    // },
                    // completed: {
                    //     type: "boolean",
                    //     description: "The status of the todo",
                    //     example: false
                    // }
                }
            },
            Bad: {
                type: 'object',
                properties: {
                    message: {
                        type: 'string',
                        description: "No Record(s) Found",
                    }
                }
            },
            Internal: {
                type: 'object',
                properties: {
                    message: {
                        type: 'string',
                        description: "Something went wrong",
                    }
                }
            },
            Error: {
                type: 'object',
                properties: {
                    message: {
                        type: 'string'
                    },
                    internal_code: {
                        type: 'string'
                    }
                }
            }
        }
    },

    "tags": ['Data Get/Fetch Operations', 'user'],

    "paths": {
        '/bluecom_api/api/getCategorySubCategory': {
            get: {
                tags: ['Data Get/Fetch Operations'],
                description: "Get category and subcategory details",
                parameters: [

                ],
                responses: {
                    '200': {
                        description: "Success",
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: "#/components/schemas/Success"
                                }
                            }
                        }
                    },
                    '400': {
                        description: "Bad Request",
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: "#/components/schemas/Bad"
                                }
                            }
                        }
                    },
                    '500': {
                        description: "Internal Server Error",
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: "#/components/schemas/Internal"
                                }
                            }
                        }
                    },
                    '404': {
                        description: "Service not found",
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error',
                                    example: {
                                        message: "We can't find the service"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        '/bluecom_api/api/getBrands': {
            get: {
                tags: ['Data Get/Fetch Operations'],
                description: "Get all brands",
                parameters: [

                ],
                responses: {
                    '200': {
                        description: "Success",
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: "#/components/schemas/Success"
                                }
                            }
                        }
                    },
                    '400': {
                        description: "Bad Request",
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: "#/components/schemas/Bad"
                                }
                            }
                        }
                    },
                    '500': {
                        description: "Internal Server Error",
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: "#/components/schemas/Internal"
                                }
                            }
                        }
                    },
                    '404': {
                        description: "Service not found",
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error',
                                    example: {
                                        message: "We can't find the service"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        '/bluecom_api/api/fetchItems': {
            post: {
                tags: ['Data Get/Fetch Operations'],
                description: "API Fetch item details and list",
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                $ref: "#/components/schemas/fetchItems"
                            }
                        }
                    }
                },
                responses: {
                    '200': {
                        description: "Success",
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: "#/components/schemas/Success"
                                }
                            }
                        }
                    },
                    '400': {
                        description: "Bad Request",
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: "#/components/schemas/Bad"
                                }
                            }
                        }
                    },
                    '500': {
                        description: "Internal Server Error",
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: "#/components/schemas/Internal"
                                }
                            }
                        }
                    },
                    '404': {
                        description: "Service not found",
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error',
                                    example: {
                                        message: "We can't find the service"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        '/bluecom_api/api/fetchFilteredItems': {
            post: {
                tags: ['Data Get/Fetch Operations'],
                description: "API Fetch item details and list",
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                $ref: "#/components/schemas/fetchFilteredItems"
                            }
                        }
                    }
                },
                responses: {
                    '200': {
                        description: "Success",
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: "#/components/schemas/Success"
                                }
                            }
                        }
                    },
                    '400': {
                        description: "Bad Request",
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: "#/components/schemas/Bad"
                                }
                            }
                        }
                    },
                    '500': {
                        description: "Internal Server Error",
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: "#/components/schemas/Internal"
                                }
                            }
                        }
                    },
                    '404': {
                        description: "Service not found",
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error',
                                    example: {
                                        message: "We can't find the service"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        '/bluecom_api/api/registerUser': {
            post: {
                tags: ['user'],
                description: "API register new user",
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                $ref: "#/components/schemas/registerUser"
                            }
                        }
                    }
                },
                responses: {
                    '200': {
                        description: "Success",
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: "#/components/schemas/Success"
                                }
                            }
                        }
                    },
                    '400': {
                        description: "Bad Request",
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: "#/components/schemas/Bad"
                                }
                            }
                        }
                    },
                    '500': {
                        description: "Internal Server Error",
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: "#/components/schemas/Internal"
                                }
                            }
                        }
                    },
                    '404': {
                        description: "Service not found",
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error',
                                    example: {
                                        message: "We can't find the service"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        '/bluecom_api/api/login': {
            post: {
                tags: ['user'],
                description: "API to login registered users",
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                $ref: "#/components/schemas/login"
                            }
                        }
                    }
                },
                responses: {
                    '200': {
                        description: "Success",
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: "#/components/schemas/Success"
                                }
                            }
                        }
                    },
                    '400': {
                        description: "Bad Request",
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: "#/components/schemas/Bad"
                                }
                            }
                        }
                    },
                    '500': {
                        description: "Internal Server Error",
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: "#/components/schemas/Internal"
                                }
                            }
                        }
                    },
                    '404': {
                        description: "Service not found",
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error',
                                    example: {
                                        message: "We can't find the service"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        '/bluecom_api/api/upsertUserWishlist': {
            post: {
                tags: ['user'],
                description: "API to add/update wishlist",
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                $ref: "#/components/schemas/upsert"
                            }
                        }
                    }
                },
                responses: {
                    '200': {
                        description: "Success",
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: "#/components/schemas/Success"
                                }
                            }
                        }
                    },
                    '400': {
                        description: "Bad Request",
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: "#/components/schemas/Bad"
                                }
                            }
                        }
                    },
                    '500': {
                        description: "Internal Server Error",
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: "#/components/schemas/Internal"
                                }
                            }
                        }
                    },
                    '404': {
                        description: "Service not found",
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error',
                                    example: {
                                        message: "We can't find the service"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        '/bluecom_api/api/upsertUserCart': {
            post: {
                tags: ['user'],
                description: "API to add/update cart",
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                $ref: "#/components/schemas/upsert"
                            }
                        }
                    }
                },
                responses: {
                    '200': {
                        description: "Success",
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: "#/components/schemas/Success"
                                }
                            }
                        }
                    },
                    '400': {
                        description: "Bad Request",
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: "#/components/schemas/Bad"
                                }
                            }
                        }
                    },
                    '500': {
                        description: "Internal Server Error",
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: "#/components/schemas/Internal"
                                }
                            }
                        }
                    },
                    '404': {
                        description: "Service not found",
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error',
                                    example: {
                                        message: "We can't find the service"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        '/bluecom_api/api/fetchUserBucketList': {
            post: {
                tags: ['user'],
                description: "API to fetch user wishlist and cart",
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                $ref: "#/components/schemas/cart"
                            }
                        }
                    }
                },
                responses: {
                    '200': {
                        description: "Success",
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: "#/components/schemas/Success"
                                }
                            }
                        }
                    },
                    '400': {
                        description: "Bad Request",
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: "#/components/schemas/Bad"
                                }
                            }
                        }
                    },
                    '500': {
                        description: "Internal Server Error",
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: "#/components/schemas/Internal"
                                }
                            }
                        }
                    },
                    '404': {
                        description: "Service not found",
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error',
                                    example: {
                                        message: "We can't find the service"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        '/bluecom_api/api/upsertAddress': {
            post: {
                tags: ['user'],
                description: "API to add or update address",
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                $ref: "#/components/schemas/upsertAddress"
                            }
                        }
                    }
                },
                responses: {
                    '200': {
                        description: "Success",
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: "#/components/schemas/Success"
                                }
                            }
                        }
                    },
                    '400': {
                        description: "Bad Request",
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: "#/components/schemas/Bad"
                                }
                            }
                        }
                    },
                    '500': {
                        description: "Internal Server Error",
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: "#/components/schemas/Internal"
                                }
                            }
                        }
                    },
                    '404': {
                        description: "Service not found",
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error',
                                    example: {
                                        message: "We can't find the service"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        '/bluecom_api/api/getAddress': {
            get: {
                tags: ['user'],
                description: "API to get address",
                "parameters": [
                    {
                        "name": "customerId",
                        "in": "query",
                        "type": "string",
                        "required": true
                    }
                ],
                responses: {
                    '200': {
                        description: "Success",
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: "#/components/schemas/Success"
                                }
                            }
                        }
                    },
                    '400': {
                        description: "Bad Request",
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: "#/components/schemas/Bad"
                                }
                            }
                        }
                    },
                    '500': {
                        description: "Internal Server Error",
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: "#/components/schemas/Internal"
                                }
                            }
                        }
                    },
                    '404': {
                        description: "Service not found",
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error',
                                    example: {
                                        message: "We can't find the service"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        '/bluecom_api/api/addProductReview': {
            post: {
                tags: ['user'],
                description: "API to add customer product review and rating",
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                $ref: "#/components/schemas/productReview"
                            }
                        }
                    }
                },
                responses: {
                    '200': {
                        description: "Success",
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: "#/components/schemas/Success"
                                }
                            }
                        }
                    },
                    '400': {
                        description: "Bad Request",
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: "#/components/schemas/Bad"
                                }
                            }
                        }
                    },
                    '500': {
                        description: "Internal Server Error",
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: "#/components/schemas/Internal"
                                }
                            }
                        }
                    },
                    '404': {
                        description: "Service not found",
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error',
                                    example: {
                                        message: "We can't find the service"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        '/bluecom_api/api/getProductReview': {
            get: {
                tags: ['user'],
                description: "API to get reviews",
                "parameters": [
                    {
                        "name": "itemId",
                        "in": "query",
                        "type": "string",
                        "required": true
                    }
                ],
                responses: {
                    '200': {
                        description: "Success",
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: "#/components/schemas/Success"
                                }
                            }
                        }
                    },
                    '400': {
                        description: "Bad Request",
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: "#/components/schemas/Bad"
                                }
                            }
                        }
                    },
                    '500': {
                        description: "Internal Server Error",
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: "#/components/schemas/Internal"
                                }
                            }
                        }
                    },
                    '404': {
                        description: "Service not found",
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error',
                                    example: {
                                        message: "We can't find the service"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        '/bluecom_api/api/getSalesOrderInfo': {
            get: {
                tags: ['user'],
                description: "API to get SalesOrderInfo",
                "parameters": [
                    {
                        "name": "salesOrderId",
                        "in": "query",
                        "type": "string",
                        "required": true
                    }
                ],
                responses: {
                    '200': {
                        description: "Success",
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: "#/components/schemas/Success"
                                }
                            }
                        }
                    },
                    '400': {
                        description: "Bad Request",
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: "#/components/schemas/Bad"
                                }
                            }
                        }
                    },
                    '500': {
                        description: "Internal Server Error",
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: "#/components/schemas/Internal"
                                }
                            }
                        }
                    },
                    '404': {
                        description: "Service not found",
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error',
                                    example: {
                                        message: "We can't find the service"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        '/bluecom_api/api/getCustomerSalesOrders': {
            get: {
                tags: ['user'],
                description: "API to get CustomerSalesOrders",
                "parameters": [
                    {
                        "name": "customerId",
                        "in": "query",
                        "type": "string",
                        "required": true
                    }
                ],
                responses: {
                    '200': {
                        description: "Success",
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: "#/components/schemas/Success"
                                }
                            }
                        }
                    },
                    '400': {
                        description: "Bad Request",
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: "#/components/schemas/Bad"
                                }
                            }
                        }
                    },
                    '500': {
                        description: "Internal Server Error",
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: "#/components/schemas/Internal"
                                }
                            }
                        }
                    },
                    '404': {
                        description: "Service not found",
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error',
                                    example: {
                                        message: "We can't find the service"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}