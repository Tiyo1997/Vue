import Mock from 'mockjs'

const shop = {
    "list|4": [{
        id: '@id',
        name: '@ctitle',
        "price|1-10.2": 1,
        count: 1
    }]
}

const tab = {
    "list|4": [{
        typeId: '@id',
        classType: '@ctitle(3,5)',
        "titleList|10": [{
            titleId: '@id',
            'title|3': '@ctitle',
            body: '@cparagraph'
        }]
    }]
}

Mock.mock('/api/shop', 'post', shop);
Mock.mock('/api/tab', 'get', tab);

// export default Mock;