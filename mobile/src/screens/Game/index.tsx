import { useEffect, useState } from 'react';
import { styles } from './styles';
import logoImg from "../../assets/logo-nlw-esports.png";
import { View, TouchableOpacity, Image, FlatList, Text } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Background } from '../../components/Background';
import { GameParams } from '../../@types/navigation';
import { Entypo } from "@expo/vector-icons";
import { THEME } from '../../theme';
import { Heading } from '../../components/Heading';
import { DuoCard, DuoCardsProps } from '../../components/DuoCard';
import { DuoMatch } from "../../components/DuoMatch";

import { API_URL } from '@env'

export function Game() {
    const [duos, setDuos] = useState<DuoCardsProps[]>([])
    const [discordDuoSelected, setDiscordDuoSelected] = useState('')

    const navigation = useNavigation()
    const route = useRoute()
    const game = route.params as GameParams

    function handleGoBack() {
        navigation.goBack()
    }

    async function getDiscorUser(asdId: string) {
        fetch(`${API_URL}/ads/${asdId}/discord`)
            .then(response => response.json())
            .then(data => setDiscordDuoSelected(data.discord))
            .catch(e => console.log(e))
    }

    useEffect(() => {
        fetch(`${API_URL}/games/${game.id}/ads`)
            .then(response => response.json())
            .then(data => setDuos(data))
            .catch(e => console.log(e))
    }, [])


    return (
        <Background>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleGoBack}>
                        <Entypo
                            name='chevron-thin-left'
                            color={THEME.COLORS.CAPTION_300}
                            size={20}
                        />
                    </TouchableOpacity>
                    <Image
                        source={logoImg}
                        style={styles.logo}
                    />
                    <View style={styles.right} />
                </View>

                <Image
                    source={{ uri: game.bannerUrl }}
                    style={styles.cover}
                    resizeMode="cover"
                />

                <Heading
                    title={game.title}
                    subtitle="Conecte-se e comece a jogar!"
                />
                <FlatList
                    data={duos}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <DuoCard data={item}
                            onConnect={() => getDiscorUser(item.id)}
                        />
                    )}
                    horizontal
                    style={styles.containerList}
                    contentContainerStyle={duos.length > 0 ? styles.contentList : styles.emptyListContent}
                    showsHorizontalScrollIndicator={false}
                    ListEmptyComponent={() => (
                        <Text style={styles.emptyListText}>
                            Não há anúncios publicados ainda.
                        </Text>
                    )}
                />
                <DuoMatch
                    onClose={() => setDiscordDuoSelected('')}
                    visible={!!discordDuoSelected}
                    discord={discordDuoSelected}
                />
            </SafeAreaView>
        </Background>
    );
}