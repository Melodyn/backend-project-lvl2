# Hexlet: "Вычислитель отличий"

[![Maintainability](https://api.codeclimate.com/v1/badges/060aacab1982204a94f8/maintainability)](https://codeclimate.com/github/Melodyn/backend-project-lvl2/maintainability)
[![Github Actions](https://github.com/Melodyn/backend-project-lvl2/workflows/Node.js%20CI/badge.svg)](https://github.com/Melodyn/backend-project-lvl2/actions)

Подробнее: https://ru.hexlet.io/professions/backend/projects/46

## Требования

* Node.js >= 14
* make >= 4

Или:
* Docker >= 19
* Docker compose >= 1.25

## Установка и запуск

Локально:
* `make setup`   // установка (первый раз)
* `make install` // установка утилиты
* `gendiff -h`   // запуск утилиты (вызов справки)

В контейнере:
* `make container_setup`
* `make container_start`
* `make install`
* `gendiff -h`

Дополнительно:
* `make lint` // запустить линтер
* `make test` // прогнать тесты

## Демонстрация

* parse json: https://asciinema.org/a/334006
* parse yml: https://asciinema.org/a/334330

