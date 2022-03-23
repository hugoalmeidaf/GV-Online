import { useState } from "react";
import { Alert, Button, NativeSyntheticEvent, StyleSheet, Text, TextInput, TextInputChangeEventData, View } from "react-native";

export default function CartaoGV() {
    const [numeroCartao, setNumeroCartao] = useState('');
    const [btnDesabilitado, setbtnDesabilitado] = useState(true);
    const [saldo, setSaldo] = useState<number>();

    const onNumeroChange = (texto: string) => {
        texto = texto.replace(/[^0-9]/g, '');
        setbtnDesabilitado(true);

        if (texto.length == 15) {
            texto = texto.substring(0, 14) + '-' + texto.substring(14, 15);
            setbtnDesabilitado(false);
        }

        setNumeroCartao(texto);

    }

    const consultaSaldo = () => {
      
        
        const numero = numeroCartao.replace(/[^0-9]/g, '');
        fetch('https://recargafacilgv.gvbus.org.br/citsbe-recarga-web/proxy_citsbe/citsbe-recarga-service/citsbe/recarga/solicitacaocarga/findCartaoByCodigoExterno/' + numero, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        })
            .then((response) => response.json())
            .then((r) => {
                if (r.saldo) {
                    Alert.alert(
                        "",
                        "Saldo de R$ " + r.saldo,
                        [
                            { text: "OK" }
                        ]
                    )
                }
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Digite o número do seu <Text style={styles.bold}>CartãoGV</Text></Text>
            <TextInput style={styles.input} keyboardType='numeric' onChangeText={onNumeroChange} value={numeroCartao} maxLength={16}></TextInput>
            <View style={styles.btn}>
                <Button title="Consultar" color="#ec2e5e" onPress={consultaSaldo} disabled={btnDesabilitado}></Button>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#283d5c',
        padding: 30,
        width: '100%',
        borderRadius: 15
    },
    text: {
        color: '#fff',
        fontSize: 18
    },
    bold: {
        fontWeight: 'bold'
    },
    input: {
        color: '#fff',
        backgroundColor: '#1b2d47',
        width: '100%',
        marginTop: 15,
        padding: 10,
        fontSize: 20
    },
    btn: {
        marginTop: 15,
    },
})