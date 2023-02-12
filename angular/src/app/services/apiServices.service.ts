import { Injectable } from '@angular/core'
import { ApolloQueryResult } from '@apollo/client/core'
import { Apollo, ApolloBase, gql } from 'apollo-angular'
import { EmptyObject } from 'apollo-angular/types'
import { Observable } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class ApiService {

    constructor(private apolloProvider: Apollo) {
    }

    getData(): Observable<ApolloQueryResult<any>> {
        return this.apolloProvider.watchQuery<any, EmptyObject>({
            query: gql`
                query {
                    personCount
                    allPersons {
                        name
                        phone
                        street
                        city
                        id
                        infoAll
                        address {
                          city
                          street
                        }
                    }
                }
            `
        }).valueChanges
    }
}