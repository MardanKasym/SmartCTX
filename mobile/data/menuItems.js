export const menuItems = [
    {
        id: '1',
        name: 'Борщ Домашний',
        category: 'Супы',
        price: 900,
        calories: 250,
        image: 'https://images.unsplash.com/photo-1547592166-23acbe3a624b?auto=format&fit=crop&w=400&q=60',
        description: 'Традиционный свекольный суп со сметаной и зеленью.',
        ingredients: ['Свекла', 'Капуста', 'Картофель', 'Морковь', 'Говядина', 'Сметана'],
        allergens: ['Лактоза (сметана)']
    },
    {
        id: '2',
        name: 'Солянка',
        category: 'Супы',
        price: 950,
        calories: 280,
        image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=400&q=60',
        description: 'Наваристый суп с несколькими видами мяса и лимоном.',
        ingredients: ['Колбаса', 'Ветчина', 'Огурцы соленые', 'Оливки', 'Лимон'],
        allergens: []
    },
    {
        id: '3',
        name: 'Котлета по-киевски',
        category: 'Горячее',
        price: 1200,
        calories: 550,
        image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=400&q=60',
        description: 'Сочная куриная грудка с маслом и зеленью внутри.',
        ingredients: ['Куриное филе', 'Сливочное масло', 'Панировочные сухари', 'Зелень'],
        allergens: ['Глютен', 'Лактоза']
    },
    {
        id: '4',
        name: 'Пюре с гуляшом',
        category: 'Горячее',
        price: 1100,
        calories: 450,
        image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=400&q=60',
        description: 'Нежное картофельное пюре с мясной подливой.',
        ingredients: ['Картофель', 'Молоко', 'Сливочное масло', 'Говядина', 'Томатная паста'],
        allergens: ['Лактоза']
    },
    {
        id: '5',
        name: 'Салат Цезарь',
        category: 'Салаты',
        price: 1050,
        calories: 320,
        image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=400&q=60',
        description: 'Классический рецепт с курицей, сухариками и пармезаном.',
        ingredients: ['Салат Романо', 'Куриная грудка', 'Сыр Пармезан', 'Сухарики', 'Соус Цезарь'],
        allergens: ['Глютен', 'Лактоза', 'Яйца']
    },
    {
        id: '6',
        name: 'Греческий Салат',
        category: 'Салаты',
        price: 900,
        calories: 200,
        image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=400&q=60',
        description: 'Свежие овощи, сыр фета, оливки и оливковое масло.',
        ingredients: ['Помидоры', 'Огурцы', 'Перец', 'Сыр Фета', 'Маслины'],
        allergens: ['Лактоза']
    },
    {
        id: '7',
        name: 'Морс Клюквенный',
        category: 'Напитки',
        price: 300,
        calories: 80,
        image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=400&q=60',
        description: 'Домашний витаминный напиток из свежих ягод.',
        ingredients: ['Клюква', 'Вода', 'Сахар'],
        allergens: []
    },
    {
        id: '8',
        name: 'Чизкейк Нью-Йорк',
        category: 'Десерты',
        price: 750,
        calories: 350,
        image: 'https://images.unsplash.com/photo-1524351199678-941a58a3df50?auto=format&fit=crop&w=400&q=60',
        description: 'Нежный творожный десерт с ванильным вкусом.',
        ingredients: ['Творожный сыр', 'Сливки', 'Песочное печенье', 'Яйцо', 'Ваниль'],
        allergens: ['Лактоза', 'Глютен', 'Яйца']
    }
];

export const categories = ['Все', 'Супы', 'Горячее', 'Салаты', 'Напитки', 'Десерты'];
