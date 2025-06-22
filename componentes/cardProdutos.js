import {View, Text, Image, StyleSheet,Button} from 'react-native';

export default function CardProduct({id, nome, valor,imagem,comprar}){
    return (
        <View>
            <Image style={styles.card} source={{uri: imagem}}/>
            <Text style={styles.txtItem}> {id}</Text>
            <Text style={styles.txtItem}> {nome} - R$ {valor.toFixed(2)}</Text>
            <Button title='Comprar' onPress={comprar}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    txt:{
        fontSize: 25,
        color: '#00BFFF',
        
    },
    txtItem:{
        fontSize: 18,
        fontWeight: 'bold',
        color: '#00BFFF'
    },
    card: {
        backgroundColor: 'white',
        width: 300,
        height: 300,
        margin: 10,
        borderRadius: 10,
    },
    img: 
    {
        width: 200,
        height: 100,
    }

})