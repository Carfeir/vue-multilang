<template>
  <main>
    <h1>{{ $t("home.header") }}</h1>
    <p>{{ $t("home.created_by", { name: "Maurizio" }) }}</p>
    <p>{{ $t("home.num_visits", 30) }}</p>
    <p>{{ $d(new Date(), "longFormat") }}</p>
  </main>
</template>

<script>
// Add this script:
import { useI18n } from 'vue-i18n'

export default {
  setup() {
    const { t } = useI18n()

    return { t }
    // t of translate :D
  }
}
</script>
