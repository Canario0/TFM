import { Db } from 'mongodb';
import { MigrationInterface } from 'mongo-migrate-ts';
import { Icons } from 'src/context/shared/domain/types';
import { DocumentPrimitives } from 'src/context/shared/infrastructure/mongoDB/types/documentPrimitives';
import { CategoryEntity } from 'src/context/categories/domain/entities/category.entity';
import { ProductEntity } from 'src/context/products/domain/entities/product.entity';

const categories = [
    {
        _id: '85b3a6bb-28eb-4f1a-9068-28bb26c4ce5a',
        name: 'Televisores',
        icon: Icons.Appliance,
        subCategories: [
            {
                name: 'Dimensiones',
                icon: Icons.Dimensions,
                metadata: ['vertical', 'horizontal', 'pulgadas'],
            },
            {
                name: 'Audio',
                icon: Icons.Audio,
                metadata: ['dolby', 'canales'],
            },
        ],
        version: 0,
    },
    {
        _id: 'd91f9c01-a2b4-4f21-b143-0482134ebfa0',
        name: 'Smartphones',
        icon: Icons.Smartphone,
        subCategories: [
            {
                name: 'Pantalla',
                icon: Icons.Display,
                metadata: [
                    'tamaño',
                    'resolución',
                    'tipo',
                    'frecuencia',
                    'protección',
                ],
            },
            {
                name: 'Cámara',
                icon: Icons.Camera,
                metadata: ['megapíxeles', 'apertura', 'zoom óptico'],
            },
        ],
        version: 0,
    },
    {
        _id: 'a8fae56f-62fa-4b67-910d-08f0635e2f0c',
        name: 'Laptops',
        icon: Icons.Laptop,
        subCategories: [
            {
                name: 'Procesador',
                icon: Icons.CPU,
                metadata: ['modelo', 'núcleos', 'frecuencia'],
            },
            {
                name: 'Memoria',
                icon: Icons.RAM,
                metadata: ['capacidad', 'tipo', 'velocidad'],
            },
        ],
        version: 0,
    },
    {
        _id: 'ba3e01cb-f543-469b-ae33-5c6cb9a0b2e3',
        name: 'Tablets',
        icon: Icons.Tablet,
        subCategories: [
            {
                name: 'Conectividad',
                icon: Icons.Connectivity,
                metadata: ['wifi', 'bluetooth', 'lte'],
            },
            {
                name: 'Batería',
                icon: Icons.Battery,
                metadata: ['capacidad', 'carga rápida'],
            },
        ],
        version: 0,
    },
    {
        _id: 'dd1762f5-20c6-4f60-bec8-cc0cb558af59',
        name: 'Auriculares',
        icon: Icons.Headphones,
        subCategories: [
            {
                name: 'Sonido',
                icon: Icons.Audio,
                metadata: [
                    'cancelación de ruido',
                    'frecuencia',
                    'sensibilidad',
                    'impedancia',
                ],
            },
            {
                name: 'Diseño',
                icon: Icons.Design,
                metadata: ['tipo', 'material', 'colores disponibles'],
            },
        ],
        version: 0,
    },
];

const products = [
    {
        _id: '85b3a6bb-28eb-4f1a-9068-28bb26c4ce5b',
        name: 'Televisores Modelo TEL3325',
        category: 'Televisores',
        maker: 'GenTech',
        brand: 'GenTech',
        model: 'TEL3325',
        price: 439.44,
        description: 'Producto de prueba para la categoría Televisores.',
        icon: Icons.Appliance,
        reviews: [],
        rating: 7.5,
        version: 0,
        subCategories: [
            {
                name: 'Dimensiones',
                icon: Icons.Dimensions,
                metadata: [
                    {
                        key: 'vertical',
                        value: '32.6 cm',
                    },
                    {
                        key: 'horizontal',
                        value: '33.3 cm',
                    },
                    {
                        key: 'pulgadas',
                        value: '75',
                    },
                ],
            },
            {
                name: 'Audio',
                icon: Icons.Audio,
                metadata: [
                    {
                        key: 'dolby',
                        value: 'Dolby Digital',
                    },
                    {
                        key: 'canales',
                        value: '63',
                    },
                ],
            },
        ],
    },
    {
        _id: '85b3a6bb-28eb-4f1a-9068-28bb26c4ce5c',
        name: 'Televisores Modelo TEL4497',
        category: 'Televisores',
        maker: 'GenTech',
        brand: 'GenTech',
        model: 'TEL4497',
        price: 1469.09,
        description: 'Producto de prueba para la categoría Televisores.',
        icon: Icons.Appliance,
        reviews: [],
        rating: 8.2,
        version: 0,
        subCategories: [
            {
                name: 'Dimensiones',
                icon: Icons.Dimensions,
                metadata: [
                    {
                        key: 'vertical',
                        value: '48.3 cm',
                    },
                    {
                        key: 'horizontal',
                        value: '90.5 cm',
                    },
                    {
                        key: 'pulgadas',
                        value: '32',
                    },
                ],
            },
            {
                name: 'Audio',
                icon: Icons.Audio,
                metadata: [
                    {
                        key: 'dolby',
                        value: 'Dolby Audio',
                    },
                    {
                        key: 'canales',
                        value: '9',
                    },
                ],
            },
        ],
    },
    {
        _id: '85b3a6bb-28eb-4f1a-9068-28bb26c4ce5d',
        name: 'Televisores Modelo TEL9381',
        category: 'Televisores',
        maker: 'GenTech',
        brand: 'GenTech',
        model: 'TEL9381',
        price: 1206.16,
        description: 'Producto de prueba para la categoría Televisores.',
        icon: Icons.Appliance,
        reviews: [],
        rating: 6.8,
        version: 0,
        subCategories: [
            {
                name: 'Dimensiones',
                icon: Icons.Dimensions,
                metadata: [
                    {
                        key: 'vertical',
                        value: '72.7 cm',
                    },
                    {
                        key: 'horizontal',
                        value: '39.0 cm',
                    },
                    {
                        key: 'pulgadas',
                        value: '55',
                    },
                ],
            },
            {
                name: 'Audio',
                icon: Icons.Audio,
                metadata: [
                    {
                        key: 'dolby',
                        value: 'Dolby Digital',
                    },
                    {
                        key: 'canales',
                        value: '7',
                    },
                ],
            },
        ],
    },
    {
        _id: '85b3a6bb-28eb-4f1a-9068-28bb26c4ce5e',
        name: 'Televisores Modelo TEL2608',
        category: 'Televisores',
        maker: 'GenTech',
        brand: 'GenTech',
        model: 'TEL2608',
        price: 1738.83,
        description: 'Producto de prueba para la categoría Televisores.',
        icon: Icons.Appliance,
        reviews: [],
        rating: 9.1,
        version: 0,
        subCategories: [
            {
                name: 'Dimensiones',
                icon: Icons.Dimensions,
                metadata: [
                    {
                        key: 'vertical',
                        value: '100.0 cm',
                    },
                    {
                        key: 'horizontal',
                        value: '91.2 cm',
                    },
                    {
                        key: 'pulgadas',
                        value: '75',
                    },
                ],
            },
            {
                name: 'Audio',
                icon: Icons.Audio,
                metadata: [
                    {
                        key: 'dolby',
                        value: 'Dolby Atmos',
                    },
                    {
                        key: 'canales',
                        value: '80',
                    },
                ],
            },
        ],
    },
    {
        _id: '85b3a6bb-28eb-4f1a-9068-28bb26c4ce5f',
        name: 'Televisores Modelo TEL8484',
        category: 'Televisores',
        maker: 'GenTech',
        brand: 'GenTech',
        model: 'TEL8484',
        price: 1147.53,
        description: 'Producto de prueba para la categoría Televisores.',
        icon: Icons.Appliance,
        reviews: [],
        rating: 7.9,
        version: 0,
        subCategories: [
            {
                name: 'Dimensiones',
                icon: Icons.Dimensions,
                metadata: [
                    {
                        key: 'vertical',
                        value: '79.7 cm',
                    },
                    {
                        key: 'horizontal',
                        value: '35.3 cm',
                    },
                    {
                        key: 'pulgadas',
                        value: '65',
                    },
                ],
            },
            {
                name: 'Audio',
                icon: Icons.Audio,
                metadata: [
                    {
                        key: 'dolby',
                        value: 'Dolby Atmos',
                    },
                    {
                        key: 'canales',
                        value: '19',
                    },
                ],
            },
        ],
    },
    {
        _id: 'd91f9c01-a2b4-4f21-b143-0482134ebfa1',
        name: 'Smartphones Modelo SMA2378',
        category: 'Smartphones',
        maker: 'GenTech',
        brand: 'GenTech',
        model: 'SMA2378',
        price: 1665.54,
        description: 'Producto de prueba para la categoría Smartphones.',
        icon: Icons.Smartphone,
        reviews: [],
        rating: 8.5,
        version: 0,
        subCategories: [
            {
                name: 'Pantalla',
                icon: Icons.Display,
                metadata: [
                    {
                        key: 'tamaño',
                        value: '6.5"',
                    },
                    {
                        key: 'resolución',
                        value: '1440x3200',
                    },
                    {
                        key: 'tipo',
                        value: 'AMOLED',
                    },
                    {
                        key: 'frecuencia',
                        value: '120Hz',
                    },
                    {
                        key: 'protección',
                        value: 'Gorilla Glass',
                    },
                ],
            },
            {
                name: 'Cámara',
                icon: Icons.Camera,
                metadata: [
                    {
                        key: 'megapíxeles',
                        value: '99 MP',
                    },
                    {
                        key: 'apertura',
                        value: 'f/1.8',
                    },
                    {
                        key: 'zoom óptico',
                        value: '4x',
                    },
                ],
            },
        ],
    },
    {
        _id: 'd91f9c01-a2b4-4f21-b143-0482134ebfa2',
        name: 'Smartphones Modelo SMA9232',
        category: 'Smartphones',
        maker: 'GenTech',
        brand: 'GenTech',
        model: 'SMA9232',
        price: 238.69,
        description: 'Producto de prueba para la categoría Smartphones.',
        icon: Icons.Smartphone,
        reviews: [],
        rating: 6.2,
        version: 0,
        subCategories: [
            {
                name: 'Pantalla',
                icon: Icons.Display,
                metadata: [
                    {
                        key: 'tamaño',
                        value: '6.1"',
                    },
                    {
                        key: 'resolución',
                        value: '1080x2400',
                    },
                    {
                        key: 'tipo',
                        value: 'LCD',
                    },
                    {
                        key: 'frecuencia',
                        value: '60Hz',
                    },
                    {
                        key: 'protección',
                        value: 'Ninguno',
                    },
                ],
            },
            {
                name: 'Cámara',
                icon: Icons.Camera,
                metadata: [
                    {
                        key: 'megapíxeles',
                        value: '74 MP',
                    },
                    {
                        key: 'apertura',
                        value: 'f/1.6',
                    },
                    {
                        key: 'zoom óptico',
                        value: '2x',
                    },
                ],
            },
        ],
    },
    {
        _id: 'd91f9c01-a2b4-4f21-b143-0482134ebfa3',
        name: 'Smartphones Modelo SMA6739',
        category: 'Smartphones',
        maker: 'GenTech',
        brand: 'GenTech',
        model: 'SMA6739',
        price: 1517.13,
        description: 'Producto de prueba para la categoría Smartphones.',
        icon: Icons.Smartphone,
        reviews: [],
        rating: 8.7,
        version: 0,
        subCategories: [
            {
                name: 'Pantalla',
                icon: Icons.Display,
                metadata: [
                    {
                        key: 'tamaño',
                        value: '6.8"',
                    },
                    {
                        key: 'resolución',
                        value: '1440x3200',
                    },
                    {
                        key: 'tipo',
                        value: 'LCD',
                    },
                    {
                        key: 'frecuencia',
                        value: '60Hz',
                    },
                    {
                        key: 'protección',
                        value: 'Templado',
                    },
                ],
            },
            {
                name: 'Cámara',
                icon: Icons.Camera,
                metadata: [
                    {
                        key: 'megapíxeles',
                        value: '30 MP',
                    },
                    {
                        key: 'apertura',
                        value: 'f/2.4',
                    },
                    {
                        key: 'zoom óptico',
                        value: '2x',
                    },
                ],
            },
        ],
    },
    {
        _id: 'd91f9c01-a2b4-4f21-b143-0482134ebfa4',
        name: 'Smartphones Modelo SMA6639',
        category: 'Smartphones',
        maker: 'GenTech',
        brand: 'GenTech',
        model: 'SMA6639',
        price: 1544.14,
        description: 'Producto de prueba para la categoría Smartphones.',
        icon: Icons.Smartphone,
        reviews: [],
        rating: 7.8,
        version: 0,
        subCategories: [
            {
                name: 'Pantalla',
                icon: Icons.Display,
                metadata: [
                    {
                        key: 'tamaño',
                        value: '6.5"',
                    },
                    {
                        key: 'resolución',
                        value: '1080x2400',
                    },
                    {
                        key: 'tipo',
                        value: 'AMOLED',
                    },
                    {
                        key: 'frecuencia',
                        value: '120Hz',
                    },
                    {
                        key: 'protección',
                        value: 'Templado',
                    },
                ],
            },
            {
                name: 'Cámara',
                icon: Icons.Camera,
                metadata: [
                    {
                        key: 'megapíxeles',
                        value: '58 MP',
                    },
                    {
                        key: 'apertura',
                        value: 'f/1.6',
                    },
                    {
                        key: 'zoom óptico',
                        value: '10x',
                    },
                ],
            },
        ],
    },
    {
        _id: 'd91f9c01-a2b4-4f21-b143-0482134ebfa5',
        name: 'Smartphones Modelo SMA1185',
        category: 'Smartphones',
        maker: 'GenTech',
        brand: 'GenTech',
        model: 'SMA1185',
        price: 1033.74,
        description: 'Producto de prueba para la categoría Smartphones.',
        icon: Icons.Smartphone,
        reviews: [],
        rating: 8.9,
        version: 0,
        subCategories: [
            {
                name: 'Pantalla',
                icon: Icons.Display,
                metadata: [
                    {
                        key: 'tamaño',
                        value: '6.8"',
                    },
                    {
                        key: 'resolución',
                        value: '1170x2532',
                    },
                    {
                        key: 'tipo',
                        value: 'LCD',
                    },
                    {
                        key: 'frecuencia',
                        value: '90Hz',
                    },
                    {
                        key: 'protección',
                        value: 'Gorilla Glass',
                    },
                ],
            },
            {
                name: 'Cámara',
                icon: Icons.Camera,
                metadata: [
                    {
                        key: 'megapíxeles',
                        value: '85 MP',
                    },
                    {
                        key: 'apertura',
                        value: 'f/2.1',
                    },
                    {
                        key: 'zoom óptico',
                        value: '7x',
                    },
                ],
            },
        ],
    },
    {
        _id: 'a8fae56f-62fa-4b67-910d-08f0635e2f0d',
        name: 'Laptops Modelo LAP9389',
        category: 'Laptops',
        maker: 'GenTech',
        brand: 'GenTech',
        model: 'LAP9389',
        price: 1933.45,
        description: 'Producto de prueba para la categoría Laptops.',
        icon: Icons.Laptop,
        reviews: [],
        rating: 9.2,
        version: 0,
        subCategories: [
            {
                name: 'Procesador',
                icon: Icons.CPU,
                metadata: [
                    {
                        key: 'modelo',
                        value: 'Ryzen 5 5600H',
                    },
                    {
                        key: 'núcleos',
                        value: '8',
                    },
                    {
                        key: 'frecuencia',
                        value: '120Hz',
                    },
                ],
            },
            {
                name: 'Memoria',
                icon: Icons.RAM,
                metadata: [
                    {
                        key: 'capacidad',
                        value: '32GB',
                    },
                    {
                        key: 'tipo',
                        value: 'OLED',
                    },
                    {
                        key: 'velocidad',
                        value: '3856 MHz',
                    },
                ],
            },
        ],
    },
    {
        _id: 'a8fae56f-62fa-4b67-910d-08f0635e2f0e',
        name: 'Laptops Modelo LAP1006',
        category: 'Laptops',
        maker: 'GenTech',
        brand: 'GenTech',
        model: 'LAP1006',
        price: 965.55,
        description: 'Producto de prueba para la categoría Laptops.',
        icon: Icons.Laptop,
        reviews: [],
        rating: 7.4,
        version: 0,
        subCategories: [
            {
                name: 'Procesador',
                icon: Icons.CPU,
                metadata: [
                    {
                        key: 'modelo',
                        value: 'i5-12400',
                    },
                    {
                        key: 'núcleos',
                        value: '8',
                    },
                    {
                        key: 'frecuencia',
                        value: '120Hz',
                    },
                ],
            },
            {
                name: 'Memoria',
                icon: Icons.RAM,
                metadata: [
                    {
                        key: 'capacidad',
                        value: '16GB',
                    },
                    {
                        key: 'tipo',
                        value: 'IPS',
                    },
                    {
                        key: 'velocidad',
                        value: '2721 MHz',
                    },
                ],
            },
        ],
    },
    {
        _id: 'a8fae56f-62fa-4b67-910d-08f0635e2f0f',
        name: 'Laptops Modelo LAP7232',
        category: 'Laptops',
        maker: 'GenTech',
        brand: 'GenTech',
        model: 'LAP7232',
        price: 1778.17,
        description: 'Producto de prueba para la categoría Laptops.',
        icon: Icons.Laptop,
        reviews: [],
        rating: 8.1,
        version: 0,
        subCategories: [
            {
                name: 'Procesador',
                icon: Icons.CPU,
                metadata: [
                    {
                        key: 'modelo',
                        value: 'i5-12400',
                    },
                    {
                        key: 'núcleos',
                        value: '6',
                    },
                    {
                        key: 'frecuencia',
                        value: '90Hz',
                    },
                ],
            },
            {
                name: 'Memoria',
                icon: Icons.RAM,
                metadata: [
                    {
                        key: 'capacidad',
                        value: '8GB',
                    },
                    {
                        key: 'tipo',
                        value: 'LCD',
                    },
                    {
                        key: 'velocidad',
                        value: '3603 MHz',
                    },
                ],
            },
        ],
    },
    {
        _id: 'a8fae56f-62fa-4b67-910d-08f0635e2f10',
        name: 'Laptops Modelo LAP8235',
        category: 'Laptops',
        maker: 'GenTech',
        brand: 'GenTech',
        model: 'LAP8235',
        price: 1845.8,
        description: 'Producto de prueba para la categoría Laptops.',
        icon: Icons.Laptop,
        reviews: [],
        rating: 8.6,
        version: 0,
        subCategories: [
            {
                name: 'Procesador',
                icon: Icons.CPU,
                metadata: [
                    {
                        key: 'modelo',
                        value: 'M2',
                    },
                    {
                        key: 'núcleos',
                        value: '4',
                    },
                    {
                        key: 'frecuencia',
                        value: '90Hz',
                    },
                ],
            },
            {
                name: 'Memoria',
                icon: Icons.RAM,
                metadata: [
                    {
                        key: 'capacidad',
                        value: '8GB',
                    },
                    {
                        key: 'tipo',
                        value: 'IPS',
                    },
                    {
                        key: 'velocidad',
                        value: '4000 MHz',
                    },
                ],
            },
        ],
    },
    {
        _id: 'a8fae56f-62fa-4b67-910d-08f0635e2f11',
        name: 'Laptops Modelo LAP5962',
        category: 'Laptops',
        maker: 'GenTech',
        brand: 'GenTech',
        model: 'LAP5962',
        price: 600.86,
        description: 'Producto de prueba para la categoría Laptops.',
        icon: Icons.Laptop,
        reviews: [],
        rating: 6.5,
        version: 0,
        subCategories: [
            {
                name: 'Procesador',
                icon: Icons.CPU,
                metadata: [
                    {
                        key: 'modelo',
                        value: 'Ryzen 5 5600H',
                    },
                    {
                        key: 'núcleos',
                        value: '4',
                    },
                    {
                        key: 'frecuencia',
                        value: '120Hz',
                    },
                ],
            },
            {
                name: 'Memoria',
                icon: Icons.RAM,
                metadata: [
                    {
                        key: 'capacidad',
                        value: '32GB',
                    },
                    {
                        key: 'tipo',
                        value: 'AMOLED',
                    },
                    {
                        key: 'velocidad',
                        value: '2572 MHz',
                    },
                ],
            },
        ],
    },
    {
        _id: 'ba3e01cb-f543-469b-ae33-5c6cb9a0b2e4',
        name: 'Tablets Modelo TAB9449',
        category: 'Tablets',
        maker: 'GenTech',
        brand: 'GenTech',
        model: 'TAB9449',
        price: 757.06,
        description: 'Producto de prueba para la categoría Tablets.',
        icon: Icons.Tablet,
        reviews: [],
        rating: 7.7,
        version: 0,
        subCategories: [
            {
                name: 'Conectividad',
                icon: Icons.Connectivity,
                metadata: [
                    {
                        key: 'wifi',
                        value: 'WiFi 5',
                    },
                    {
                        key: 'bluetooth',
                        value: '5.2',
                    },
                    {
                        key: 'lte',
                        value: 'Sí',
                    },
                ],
            },
            {
                name: 'Batería',
                icon: Icons.Battery,
                metadata: [
                    {
                        key: 'capacidad',
                        value: '32GB',
                    },
                    {
                        key: 'carga rápida',
                        value: 'Sí',
                    },
                ],
            },
        ],
    },
    {
        _id: 'ba3e01cb-f543-469b-ae33-5c6cb9a0b2e5',
        name: 'Tablets Modelo TAB9707',
        category: 'Tablets',
        maker: 'GenTech',
        brand: 'GenTech',
        model: 'TAB9707',
        price: 1018.33,
        description: 'Producto de prueba para la categoría Tablets.',
        icon: Icons.Tablet,
        reviews: [],
        rating: 8.3,
        version: 0,
        subCategories: [
            {
                name: 'Conectividad',
                icon: Icons.Connectivity,
                metadata: [
                    {
                        key: 'wifi',
                        value: 'WiFi 6E',
                    },
                    {
                        key: 'bluetooth',
                        value: '5.2',
                    },
                    {
                        key: 'lte',
                        value: 'Sí',
                    },
                ],
            },
            {
                name: 'Batería',
                icon: Icons.Battery,
                metadata: [
                    {
                        key: 'capacidad',
                        value: '8GB',
                    },
                    {
                        key: 'carga rápida',
                        value: 'No',
                    },
                ],
            },
        ],
    },
    {
        _id: 'ba3e01cb-f543-469b-ae33-5c6cb9a0b2e6',
        name: 'Tablets Modelo TAB2408',
        category: 'Tablets',
        maker: 'GenTech',
        brand: 'GenTech',
        model: 'TAB2408',
        price: 558.85,
        description: 'Producto de prueba para la categoría Tablets.',
        icon: Icons.Tablet,
        reviews: [],
        rating: 6.9,
        version: 0,
        subCategories: [
            {
                name: 'Conectividad',
                icon: Icons.Connectivity,
                metadata: [
                    {
                        key: 'wifi',
                        value: 'WiFi 5',
                    },
                    {
                        key: 'bluetooth',
                        value: '5.0',
                    },
                    {
                        key: 'lte',
                        value: 'No',
                    },
                ],
            },
            {
                name: 'Batería',
                icon: Icons.Battery,
                metadata: [
                    {
                        key: 'capacidad',
                        value: '16GB',
                    },
                    {
                        key: 'carga rápida',
                        value: 'No',
                    },
                ],
            },
        ],
    },
    {
        _id: 'ba3e01cb-f543-469b-ae33-5c6cb9a0b2e7',
        name: 'Tablets Modelo TAB9603',
        category: 'Tablets',
        maker: 'GenTech',
        brand: 'GenTech',
        model: 'TAB9603',
        price: 223.38,
        description: 'Producto de prueba para la categoría Tablets.',
        icon: Icons.Tablet,
        reviews: [],
        rating: 5.8,
        version: 0,
        subCategories: [
            {
                name: 'Conectividad',
                icon: Icons.Connectivity,
                metadata: [
                    {
                        key: 'wifi',
                        value: 'WiFi 5',
                    },
                    {
                        key: 'bluetooth',
                        value: '5.2',
                    },
                    {
                        key: 'lte',
                        value: 'Sí',
                    },
                ],
            },
            {
                name: 'Batería',
                icon: Icons.Battery,
                metadata: [
                    {
                        key: 'capacidad',
                        value: '16GB',
                    },
                    {
                        key: 'carga rápida',
                        value: 'Turbo Charge',
                    },
                ],
            },
        ],
    },
    {
        _id: 'ba3e01cb-f543-469b-ae33-5c6cb9a0b2e8',
        name: 'Tablets Modelo TAB2979',
        category: 'Tablets',
        maker: 'GenTech',
        brand: 'GenTech',
        model: 'TAB2979',
        price: 965.28,
        description: 'Producto de prueba para la categoría Tablets.',
        icon: Icons.Tablet,
        reviews: [],
        rating: 7.6,
        version: 0,
        subCategories: [
            {
                name: 'Conectividad',
                icon: Icons.Connectivity,
                metadata: [
                    {
                        key: 'wifi',
                        value: 'WiFi 6',
                    },
                    {
                        key: 'bluetooth',
                        value: '5.2',
                    },
                    {
                        key: 'lte',
                        value: 'No',
                    },
                ],
            },
            {
                name: 'Batería',
                icon: Icons.Battery,
                metadata: [
                    {
                        key: 'capacidad',
                        value: '32GB',
                    },
                    {
                        key: 'carga rápida',
                        value: 'Turbo Charge',
                    },
                ],
            },
        ],
    },
    {
        _id: 'dd1762f5-20c6-4f60-bec8-cc0cb558af60',
        name: 'Auriculares Modelo AUR1471',
        category: 'Auriculares',
        maker: 'GenTech',
        brand: 'GenTech',
        model: 'AUR1471',
        price: 863.17,
        description: 'Producto de prueba para la categoría Auriculares.',
        icon: Icons.Headphones,
        reviews: [],
        rating: 8.4,
        version: 0,
        subCategories: [
            {
                name: 'Sonido',
                icon: Icons.Audio,
                metadata: [
                    {
                        key: 'cancelación de ruido',
                        value: 'No',
                    },
                    {
                        key: 'frecuencia',
                        value: '120Hz',
                    },
                    {
                        key: 'sensibilidad',
                        value: '91 dB',
                    },
                    {
                        key: 'impedancia',
                        value: '30 Ω',
                    },
                ],
            },
            {
                name: 'Diseño',
                icon: Icons.Design,
                metadata: [
                    {
                        key: 'tipo',
                        value: 'IPS',
                    },
                    {
                        key: 'material',
                        value: 'Metal',
                    },
                    {
                        key: 'colores disponibles',
                        value: 'Azul',
                    },
                ],
            },
        ],
    },
    {
        _id: 'dd1762f5-20c6-4f60-bec8-cc0cb558af61',
        name: 'Auriculares Modelo AUR8105',
        category: 'Auriculares',
        maker: 'GenTech',
        brand: 'GenTech',
        model: 'AUR8105',
        price: 462.09,
        description: 'Producto de prueba para la categoría Auriculares.',
        icon: Icons.Headphones,
        reviews: [],
        rating: 6.7,
        version: 0,
        subCategories: [
            {
                name: 'Sonido',
                icon: Icons.Audio,
                metadata: [
                    {
                        key: 'cancelación de ruido',
                        value: 'No',
                    },
                    {
                        key: 'frecuencia',
                        value: '90Hz',
                    },
                    {
                        key: 'sensibilidad',
                        value: '108 dB',
                    },
                    {
                        key: 'impedancia',
                        value: '33 Ω',
                    },
                ],
            },
            {
                name: 'Diseño',
                icon: Icons.Design,
                metadata: [
                    {
                        key: 'tipo',
                        value: 'OLED',
                    },
                    {
                        key: 'material',
                        value: 'Plástico',
                    },
                    {
                        key: 'colores disponibles',
                        value: 'Negro',
                    },
                ],
            },
        ],
    },
    {
        _id: 'dd1762f5-20c6-4f60-bec8-cc0cb558af62',
        name: 'Auriculares Modelo AUR5231',
        category: 'Auriculares',
        maker: 'GenTech',
        brand: 'GenTech',
        model: 'AUR5231',
        price: 515.71,
        description: 'Producto de prueba para la categoría Auriculares.',
        icon: Icons.Headphones,
        reviews: [],
        rating: 7.3,
        version: 0,
        subCategories: [
            {
                name: 'Sonido',
                icon: Icons.Audio,
                metadata: [
                    {
                        key: 'cancelación de ruido',
                        value: 'Activa',
                    },
                    {
                        key: 'frecuencia',
                        value: '120Hz',
                    },
                    {
                        key: 'sensibilidad',
                        value: '95 dB',
                    },
                    {
                        key: 'impedancia',
                        value: '64 Ω',
                    },
                ],
            },
            {
                name: 'Diseño',
                icon: Icons.Design,
                metadata: [
                    {
                        key: 'tipo',
                        value: 'IPS',
                    },
                    {
                        key: 'material',
                        value: 'Plástico',
                    },
                    {
                        key: 'colores disponibles',
                        value: 'Negro',
                    },
                ],
            },
        ],
    },
    {
        _id: 'dd1762f5-20c6-4f60-bec8-cc0cb558af63',
        name: 'Auriculares Modelo AUR6026',
        category: 'Auriculares',
        maker: 'GenTech',
        brand: 'GenTech',
        model: 'AUR6026',
        price: 1698.63,
        description: 'Producto de prueba para la categoría Auriculares.',
        icon: Icons.Headphones,
        reviews: [],
        rating: 9.0,
        version: 0,
        subCategories: [
            {
                name: 'Sonido',
                icon: Icons.Audio,
                metadata: [
                    {
                        key: 'cancelación de ruido',
                        value: 'Pasiva',
                    },
                    {
                        key: 'frecuencia',
                        value: '60Hz',
                    },
                    {
                        key: 'sensibilidad',
                        value: '105 dB',
                    },
                    {
                        key: 'impedancia',
                        value: '45 Ω',
                    },
                ],
            },
            {
                name: 'Diseño',
                icon: Icons.Design,
                metadata: [
                    {
                        key: 'tipo',
                        value: 'LCD',
                    },
                    {
                        key: 'material',
                        value: 'Metal',
                    },
                    {
                        key: 'colores disponibles',
                        value: 'Rojo',
                    },
                ],
            },
        ],
    },
    {
        _id: 'dd1762f5-20c6-4f60-bec8-cc0cb558af64',
        name: 'Auriculares Modelo AUR5673',
        category: 'Auriculares',
        maker: 'GenTech',
        brand: 'GenTech',
        model: 'AUR5673',
        price: 593.51,
        description: 'Producto de prueba para la categoría Auriculares.',
        icon: Icons.Headphones,
        reviews: [],
        rating: 7.1,
        version: 0,
        subCategories: [
            {
                name: 'Sonido',
                icon: Icons.Audio,
                metadata: [
                    {
                        key: 'cancelación de ruido',
                        value: 'Activa',
                    },
                    {
                        key: 'frecuencia',
                        value: '60Hz',
                    },
                    {
                        key: 'sensibilidad',
                        value: '102 dB',
                    },
                    {
                        key: 'impedancia',
                        value: '41 Ω',
                    },
                ],
            },
            {
                name: 'Diseño',
                icon: Icons.Design,
                metadata: [
                    {
                        key: 'tipo',
                        value: 'OLED',
                    },
                    {
                        key: 'material',
                        value: 'Plástico',
                    },
                    {
                        key: 'colores disponibles',
                        value: 'Rojo',
                    },
                ],
            },
        ],
    },
];

export class Migration1749071488237 implements MigrationInterface {
    public async up(db: Db): Promise<void | never> {
        await db
            .collection<DocumentPrimitives<CategoryEntity>>('categories')
            .insertMany(categories as DocumentPrimitives<CategoryEntity>[]);
        await db
            .collection<DocumentPrimitives<ProductEntity>>('products')
            .insertMany(
                products as unknown as DocumentPrimitives<ProductEntity>[],
            );
    }

    public async down(db: Db): Promise<void | never> {
        await db.collection('categories').deleteMany({});
        await db.collection('products').deleteMany({});
    }
}
