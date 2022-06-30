import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RouteBasicModel} from '../model/routeBasicModel';
import {RouteDto} from '../model/dto';
import notifications from '../utils/notifications';

declare var ymaps: any;

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    route

    constructor(private http: HttpClient) {
    }

    ngOnInit() {
        this.http.get<RouteDto>('assets/json/coords.json')
            .toPromise()
            .then((data) => this.route = new RouteBasicModel(data.name, data.description, data.coords))
            .then((data) => notifications.showNotificationInfo("Загружен маршрут \"" + data.name + "\""))

        ymaps.ready().then(() => {
            this.init()
        });
    }

    init() {
        const multiRoute = this.multiRoute()

        this.addEvents(multiRoute)

        const myMap = this.createMap(multiRoute)

        myMap.geoObjects.add(multiRoute)

    }

    multiRoute() {
        return new ymaps.multiRouter.MultiRoute({
            referencePoints: this.route.getPointsArray(),
            params: {
                results: 1,
                avoidTrafficJams: false,
                //Тип маршрутизации - пешеходная маршрутизация.
                routingMode: 'pedestrian'
            }
        }, {
            midPointsType: 'via',
            editorDrawOver: false,
            // Зададим собственное оформление линий мультимаршрута.
            routeActiveStrokeColor: '#ff0000',
            boundsAutoApply: true,
            zoomMargin: 30
        });
    }

    addEvents(multiRoute: any) {

    }

    createMap(multiRoute: any) {
        const mapControls = this.createMapControls(multiRoute)

        const map = new ymaps.Map('map', {
            center: [55.755773, 37.617761],
            zoom: 9,
            controls: mapControls
        }, {
            suppressMapOpenBlock: true
        })

        return map;
    }

    createMapControls(multiRoute: any) {
        return [this.createSearchControl(), 'zoomControl', 'fullscreenControl', this.createButtonEditor(multiRoute)]
    }

    createButtonEditor(multiRoute: any) {
        const buttonEditor = new ymaps.control.Button({
            data: {
                title: 'Включить/выключить редактирование маршрута',
                content: 'Режим редактирования',
                image: '/assets/icon/map/editor.png'
            },
            options: {
                layout: ymaps.templateLayoutFactory.createClass(
                    // Если кнопка не нажата, применяется CSS стиль 'myButton'.
                    // Если кнопка нажата, к ней применятся CSS-стили 'myButton' и 'myButtonSelected'.

                    '<div title=\'{{ data.title }}\'>' +
                    '<img class=\'myButton {% if state.selected %}myButtonSelected{% endif %}\' src=\'/assets/icon/map/editor.png\' alt=\'\'/>' +
                    '</div>' +
                    '<style type=\'text/css\'>' +
                    '.myButton {\n' +
                    '    width: 50px;\n' +
                    '    height: 50px;\n' +
                    '}' +
                    '.myButtonSelected {\n' +
                    '    filter: hue-rotate(180deg)\n' +
                    '}' +
                    '</style>'
                ),
                size: 'large',
                maxWidth: 200
            }
        });
        buttonEditor.events.add('select', function () {
            /**
             * Включение режима редактирования.
             * В качестве опций может быть передан объект с полями:
             * addWayPoints - разрешает добавление новых путевых точек при клике на карту. Значение по умолчанию: false.
             * dragWayPoints - разрешает перетаскивание уже существующих путевых точек. Значение по умолчанию: true.
             * removeWayPoints - разрешает удаление путевых точек при двойном клике по ним. Значение по умолчанию: false.
             * dragViaPoints - разрешает перетаскивание уже существующих транзитных точек. Значение по умолчанию: true.
             * removeViaPoints - разрешает удаление транзитных точек при двойном клике по ним. Значение по умолчанию: true.
             * addMidPoints - разрешает добавление промежуточных транзитных или путевых точек посредством перетаскивания маркера, появляющегося при наведении курсора мыши на активный маршрут. Тип добавляемых точек задается опцией midPointsType. Значение по умолчанию: true
             * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/multiRouter.MultiRoute.xml#editor
             */
            multiRoute.editor.start({
                addWayPoints: true,
                removeWayPoints: true,
                addMidPoints: true,
            });
        })

        buttonEditor.events.add('deselect', function () {
            // Выключение режима редактирования.
            multiRoute.editor.stop();
            console.log(multiRoute.getWayPoints().toArray().map(element => element.geometry.getCoordinates()))
        })

        return buttonEditor
    }

    createSearchControl() {
        return new ymaps.control.SearchControl({
            options: {
                float: 'right',
                floatIndex: 100,
                noPlacemark: true,
                size: 'small'
            }
        });
    }

}
