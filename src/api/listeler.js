import request from "./request";

export function getIlListe() {
  return request({
    url: '/listeler/il/',
    method: 'get',
  })
}

export function getIlceListe(ilGuid) {
  return request({
    url: `/listeler/il/${ilGuid}/ilce`,
    method: 'get',
  })
}
