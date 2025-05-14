<template>
    <v-app>
        <v-main class="gradient-background">
            <v-app-bar
                elevation="0"
                class="bg-transparent"
            >
                <template #prepend>
                    <v-btn
                        flat
                        variant="plain"
                        to="/"
                        class="opacity-100"
                        size="x-large"
                    >
                  
                        <template #prepend>
                            <v-img
                                :src="LogoImg"
                                width="40"
                                height="40"
                                aspect-ratio="1/1"
                            />
                        </template>

                        <span class="text-h5 font-weight-bold text-white letter-spacing-1">
                            未來路口
                        </span>
                    </v-btn>
                </template>
            </v-app-bar>
            <slot />
        </v-main>
    </v-app>
</template>
<script lang="ts" setup>
import LogoImg from '../assets/images/logo.png';
</script>
<style lang="scss" scoped>
.gradient-background {
    background: linear-gradient(45deg, #4A90E2, #50E3C2);
}
</style>