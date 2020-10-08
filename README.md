# Hexlet: "Вычислитель отличий"

[![Maintainability](https://api.codeclimate.com/v1/badges/060aacab1982204a94f8/maintainability)](https://codeclimate.com/github/Melodyn/backend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/060aacab1982204a94f8/test_coverage)](https://codeclimate.com/github/Melodyn/backend-project-lvl2/test_coverage)
[![Github Actions](https://github.com/Melodyn/backend-project-lvl2/workflows/Node.js%20CI/badge.svg)](https://github.com/Melodyn/backend-project-lvl3/actions?query=workflow%3A%22Node.js+CI%22)
[![Hexlet check](https://github.com/Melodyn/backend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/Melodyn/backend-project-lvl2/actions?query=workflow%3Ahexlet-check)

Подробнее: https://ru.hexlet.io/professions/backend/projects/46

## Требования

* Node.js >= 14
* npm >= 6
* make >= 4

Или:
* Docker >= 19
* Docker compose >= 1.25

## Установка и запуск

Локально:
* `make setup` установка (первый раз)
* `make install` установка утилиты
* `gendiff -h` запуск утилиты (вызов справки)

В контейнере:
* `make container_setup` первый запуск (установка зависимостей) 

* `make container_start` поднять контейнер с приложением
* `make install` установить приложение
* `gendiff -h`

Дополнительно:
* `make lint` проверка линтером
* `make test` проверка тестами

## Демонстрация

* diff flat json formatted as stylish: https://asciinema.org/a/334006
* diff flat yml formatted as stylish: https://asciinema.org/a/334330
* diff flat ini formatted as stylish: https://asciinema.org/a/334370
* diff nested json formatted as stylish: https://asciinema.org/a/334838
* diff nested json formatted as plain: https://asciinema.org/a/335274
* diff flat json formatted as json: https://asciinema.org/a/336188
