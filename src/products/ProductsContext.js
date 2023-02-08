import React from 'react'
import {db} from "../connection";

export const ProductsContext = React.createContext();

export class ProductsContextProvider extends React.Component {

    state = {
        Air: []
    }

    componentDidMount() {

        const prevProducts = this.state.Air;
        db.collection('Air').onSnapshot(snapshot => {
            let changes = snapshot.docChanges();
            changes.forEach(change => {
                if (change.type === 'added') {
                    prevProducts.push({
                        id: change.doc.id,
                        BTU: change.doc.data().BTU,
                        brand: change.doc.data().brand,
                        details: change.doc.data().detail,
                        price:change.doc.data().price,
                        img: change.doc.data().img
                    })
                }
                this.setState({
                    products: prevProducts
                })
            })
        })

    }
    render() {
        return (
            <ProductsContext.Provider value={{ products: [...this.state.Air] }}>
                {this.props.children}
            </ProductsContext.Provider>
        )
    }
}

