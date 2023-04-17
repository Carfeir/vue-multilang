<template>
    <nav>
        <ul>
            <li>
                <!-- using the helper function and the named route to build a proper link -->
                <RouterLink :to="Tr.i18nRoute({ name: 'home' })">{{ $t("nav.home") }}</RouterLink>
            </li>

            <li>
                <!-- Same change here, use the about route. Make sure to use the proper name as defined in your routes. -->
                <RouterLink :to="Tr.i18nRoute({ name: 'about' })">{{ $t("nav.about") }}</RouterLink>
            </li>
        </ul>
    </nav>

    <LanguageSwitcher></LanguageSwitcher>
</template>
  
<script>
import LanguageSwitcher from "@/components/LanguageSwitcher.vue"
import Tr from "@/i18n/translation" // Import the Tr object

export default {
    components: { LanguageSwitcher },
    setup() {  // Export the Tr object.
        return { Tr }
    }
}
</script>