//logic pour la sauvegarde des variables globales, dans notre cas testdata

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export default new Vuex.Store({
    //creation de l'etat (state) 'testdata'
    state: {
      testdata:null,
      testCases:null,
      testRuns:null,
      testConfigs:null
    },
    //definition d'un modificateur de variable d'etat
    mutations: {
        testdata(state,testdata){
          state.testdata = testdata
        },
        testCases(state,testCases){
          state.testCases = testCases
        },
        testRuns(state,testRuns){
          state.testRuns = testRuns
        },
        testConfigs(state,testConfigs){
          state.testConfigs = testConfigs
        },
    },
    //definition d'un recuperateur de contenu de variable
    getters:{
        testdata: (state)=>{
          return state.testdata;
        },
        testCases: (state)=>{
          return state.testCases;
        },
        testRuns: (state)=>{
          return state.testRuns;
        },
        testConfigs: (state)=>{
          return state.testConfigs;
        }
    },
    //definition des actions possible sur nos modificateurs
    actions: {
        testdata(context, testdata){
          context.commit('testdata',testdata);
        },
        testCases(context, testCases){
          context.commit('testCases',testCases);
        },
        testRuns(context, testRuns){
          context.commit('testRuns',testRuns);
        },
        testConfigs(context, testConfigs){
          context.commit('testConfigs',testConfigs);
        }
    },
  })
  