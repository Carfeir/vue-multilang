<template>
    <select @change="switchLanguage">
        <option v-for="sLocale in supportedLocales" :key="`locale-${sLocale}`" :value="sLocale"
            :selected="locale === sLocale">
            {{ t(`locale.${sLocale}`) }}
        </option>
    </select>
</template>

<script>
import { useI18n } from 'vue-i18n'
import { useRouter } from "vue-router"
import Tr from "@/i18n/translation"

export default {
    setup() {
        const { t, locale } = useI18n()

        const supportedLocales = Tr.supportedLocales

        const router = useRouter()  // Store the router inside the constant

        const switchLanguage = async (event) => { // async function because later we’re going to load translation files inside it
            const newLocale = event.target.value // The newly chosen language will be stored inside the newLocale constant

            await Tr.switchLanguage(newLocale) // The actual language switching will be handled by our Translation helper

            try {
                await router.replace({ params: { locale: newLocale } })  // Replace our URL to the history, and add the requested locale
            } catch (e) {  // If f something goes wrong, redirect the user to the root page
                console.log(e)
                router.push("/")
            }
        }

        return { t, locale, supportedLocales, switchLanguage } // expose all the necessary objects
    }
}
</script>