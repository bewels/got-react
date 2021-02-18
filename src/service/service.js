export default class gotService {
    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api'
    }
    async getResource (url) {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Error запрос ${url} не прошел. Код ошибки ${res.status}`)
        }

        return await res.json()
    };

    getAllCharacters(pageNum, pageSize) {
        return this.getResource(`/characters?page=${pageNum}&pageSize=${pageSize}`)
    }

    async getCharacters (id) {
        const res = await this.getResource(`/characters/${id}`)
        return this._transformCharacter(res)

    }
    getHouses(id) {
        return this.getResource(`/houses/${id}`)
    }
    getBooks() {
        return this.getResource(`/characters/`)
    }

    _transformCharacter(char) {
        return {
            name: char.name ? char.name:'Нет информации',
            gender: char.gender ? char.gender:'Нет информации',
            born: char.born ? char.born:'Нет информации',
            died: char.died ? char.died:'Нет информации',
            culture: char.culture ? char.culture:'Нет информации'
        }
    }
}


