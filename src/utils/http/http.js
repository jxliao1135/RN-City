import React, { Component } from 'react'

export default class Http {

   fetch({ url, data = null }) {
      return this.init({ url, method: 'GET', data })
   }
   post({ url, data = null }) {
      return this.init({ url, method: 'POST', data })
   }
   init({ url, method, data = null }) {
      return fetch(url, { method, header: 'application/json',body:JSON.stringify(data) })
         .then(res => res.json())
         .then(data => data)
         .catch(err => { console.log(err) })
   }
}