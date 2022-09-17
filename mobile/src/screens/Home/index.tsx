import { Image, FlatList } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { styles } from './styles';
import logoImg from "../../assets/logo-nlw-esports.png";
import { Heading } from '../../components/Heading';
import { GameCard, GameCardProps } from '../../components/GameCard';
import { useEffect, useState } from 'react';
import { Background } from '../../components/Background';

import { API_URL } from '@env'



export function Home() {
    const [games, setGames] = useState<GameCardProps[]>([])
    const navigation = useNavigation()

    function handleOpenGame({ id, title, bannerUrl }: GameCardProps) {
        navigation.navigate('game', { id, title, bannerUrl })
    }

    useEffect(() => {
        fetch(`${API_URL}/games`)
            .then(response => response.json())
            .then(data => setGames(data))
            .catch(e => console.log(e))
    }, [])

    return (
        <Background>
            <SafeAreaView style={styles.container}>
                <Image
                    source={logoImg}
                    style={styles.logo}
                />
                <Heading
                    title='Encontre seu duo'
                    subtitle='Selecione o game que deseja jogar...'
                />
                <FlatList
                    style={styles.list}
                    data={games}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <GameCard
                            data={item}
                            onPress={() => handleOpenGame(item)}
                        />
                    )}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    contentContainerStyle={styles.contentList}
                />
            </SafeAreaView>
        </Background>
    );
}