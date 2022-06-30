export class RouteBasicModel {
    name: string = ''
    description: string = ''
    route: RoutePoint[]

    constructor(name, description, coords: number[][]) {
        this.route = coords.map((elem, index) => new RoutePoint(index, elem))
        this.name = name
        this.description = description
    }

    getPointsArray(): number[][] {
        return this.route.map(point => point.coords)
    }
}

export class RoutePoint {
    index: number
    description: string
    coords: number[]

    constructor(index: number, coords: number[]) {
        this.index = index;
        this.coords = coords;
    }
}
