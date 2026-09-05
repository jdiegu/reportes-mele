```vue
<template>
  <div class="login-page min-h-screen flex flex-col relative overflow-hidden">
    <!-- Fondos luminosos -->
    <div class="bg-orbs pointer-events-none" aria-hidden="true">
      <div class="orb orb-1"></div>
      <div class="orb orb-2"></div>
      <div class="orb orb-3"></div>
      <div class="orb orb-4"></div>
    </div>

    <!-- Formas flotantes -->
    <div class="floating-shapes pointer-events-none" aria-hidden="true">
      <div
        v-for="shape in floatingShapes"
        :key="shape.id"
        class="shape"
        :style="shape.style"
        v-html="shape.svg"
      ></div>
    </div>

    <div class="grid-dots pointer-events-none" aria-hidden="true"></div>

    <!-- Contenido -->
    <div class="flex-1 flex items-center justify-center p-3 sm:p-4 relative z-10">
      <div class="w-full max-w-md animate-slide-up">
        <!-- Logo -->
        <div class="text-center mb-5 sm:mb-7">
          <div class="logo-container mx-auto mb-4 sm:mb-5">
            <a
              :href="whatsappGroupLink"
              target="_blank"
              rel="noopener"
              class="block"
            >
              <div class="logo-ring">
                <div class="logo-inner">
                  <img src="/icon.png" alt="Ventas Luna Rosa" class="logo-img" />
                </div>
              </div>

              <div class="logo-glow"></div>
            </a>
          </div>

          <h1 class="login-title text-3xl sm:text-4xl mb-1">Ventas Luna Rosa</h1>

          <p class="text-sm sm:text-base login-subtitle">Sistema de reportes</p>
        </div>

        <!-- Card -->
        <div class="login-card p-5 sm:p-8">
          <!-- Tabs -->
          <div
            class="tabs-container flex rounded-xl p-1 mb-6 sm:mb-8 border"
            :style="{
              background: 'var(--bg-surface)',
              borderColor: 'var(--border-color)',
            }"
          >
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="
                activeTab = tab.id;
                errorMsg = '';
              "
              class="flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 relative overflow-hidden"
              :class="activeTab === tab.id ? 'tab-active' : 'tab-inactive'"
            >
              <span class="relative z-10">
                {{ tab.label }}
              </span>
            </button>
          </div>

          <!-- Login -->
          <form
            v-if="activeTab === 'login'"
            @submit.prevent="handleLogin"
            class="space-y-4"
          >
            <div class="field">
              <label class="field-label">
                <svg
                  class="field-label-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span>Usuario</span>
              </label>

              <input
                v-model="loginForm.username"
                type="text"
                placeholder="Tu usuario"
                required
                class="field-input"
              />
            </div>

            <div class="field">
              <label class="field-label">
                <svg
                  class="field-label-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <span>Contraseña</span>
              </label>

              <div class="field-input-wrap">
                <input
                  v-model="loginForm.password"
                  :type="showPass ? 'text' : 'password'"
                  placeholder="••••••••"
                  required
                  class="field-input field-input-action"
                />

                <button
                  type="button"
                  @click="showPass = !showPass"
                  class="field-action"
                  :title="showPass ? 'Ocultar' : 'Mostrar'"
                >
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      :d="
                        showPass
                          ? 'M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21'
                          : 'M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                      "
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div v-if="errorMsg" class="error-msg animate-shake">
              <svg
                class="w-4 h-4 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>

              {{ errorMsg }}
            </div>

            <button
              type="submit"
              :disabled="authStore.loading"
              class="submit-btn"
            >
              <svg
                v-if="authStore.loading"
                class="w-5 h-5 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                />
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>

              <svg
                v-else
                class="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>

              <span v-if="authStore.loading"> Ingresando... </span>

              <span v-else> Iniciar sesión </span>
            </button>
          </form>

          <!-- Registro -->
          <form v-else @submit.prevent="handleRegister" class="space-y-5">
            <div class="field">
              <label class="field-label">
                <svg
                  class="field-label-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span>Usuario</span>
              </label>

              <input
                v-model="registerForm.username"
                type="text"
                placeholder="Elige un usuario"
                required
                class="field-input"
              />
            </div>

            <div class="field">
              <label class="field-label">
                <svg
                  class="field-label-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span>Teléfono</span>
              </label>

              <input
                v-model="registerForm.phone"
                type="number"
                placeholder=""
                required
                class="field-input"
              />
            </div>

            <div class="field">
              <label class="field-label">
                <svg
                  class="field-label-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <span>Contraseña</span>
              </label>

              <div class="field-input-wrap">
                <input
                  v-model="registerForm.password"
                  :type="showPass ? 'text' : 'password'"
                  placeholder="Minimo 6 caracteres"
                  minlength="6"
                  required
                  class="field-input field-input-action"
                />

                <button
                  type="button"
                  @click="showPass = !showPass"
                  class="field-action"
                  :title="showPass ? 'Ocultar' : 'Mostrar'"
                >
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      :d="
                        showPass
                          ? 'M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21'
                          : 'M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                      "
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div v-if="errorMsg" class="error-msg animate-shake">
              <svg
                class="w-4 h-4 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>

              {{ errorMsg }}
            </div>

            <button
              type="submit"
              :disabled="authStore.loading"
              class="submit-btn"
            >
              <svg
                v-if="authStore.loading"
                class="w-5 h-5 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                />
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>

              <svg
                v-else
                class="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>

              <span v-if="authStore.loading"> Registrando... </span>

              <span v-else> Crear cuenta </span>
            </button>
          </form>
        </div>

        <!-- Theme -->
        <div class="flex items-center justify-center mt-6 gap-3">
          <button @click="toggleTheme" class="theme-toggle">
            <svg
              v-if="isDark"
              class="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>

            <svg
              v-else
              class="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>

            <span>
              {{ isDark ? "Modo claro" : "Modo oscuro" }}
            </span>
          </button>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer
      class="relative z-10 border-t"
      :style="{
        borderColor: 'var(--border-color)',
        background: 'linear-gradient(var(--bg-card), var(--bg-page))',
      }"
    >
      <div class="max-w-md mx-auto px-6 py-5 sm:py-6">
        <!-- Seccion superior: marca + grupo -->
        <div class="flex flex-col items-center gap-3">
          <div class="flex items-center gap-2.5">
            <img
              src="/icon.png"
              alt="Ventas Luna Rosa"
              class="w-7 h-7 rounded-lg object-cover shadow-sm"
              style="border-radius: 0.5rem"
            />
            <span class="text-[15px] font-bold tracking-tight" style="color: var(--text-primary)">
              Ventas Luna Rosa
            </span>
          </div>

          <a
            :href="whatsappGroupLink"
            target="_blank"
            rel="noopener"
            class="group flex items-center gap-2 text-[13px] font-semibold px-4 py-2 rounded-xl no-underline transition-all hover:scale-[1.04] active:scale-95"
            style="
              background: var(--rose-gradient);
              color: white;
              box-shadow: 0 4px 14px rgba(224, 36, 121, 0.3);
            "
          >
            <svg class="w-3.5 h-3.5 transition-transform group-hover:rotate-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Grupo de WhatsApp
          </a>
        </div>

        <!-- Separador -->
        <div class="flex items-center gap-3 my-4">
          <div class="flex-1 h-px" :style="{ background: 'var(--border-color)' }"></div>
          <svg class="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" :style="{ color: 'var(--rose-primary)', opacity: 0.7 }">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" fill="currentColor" />
          </svg>
          <div class="flex-1 h-px" :style="{ background: 'var(--border-color)' }"></div>
        </div>

        <!-- Seccion inferior: desarrollador -->
        <div class="flex flex-col items-center gap-3">
          <div class="text-center">
            <span class="text-[13px]" style="color: var(--text-muted)">
              Página desarrollada por
              <span class="font-semibold" style="color: var(--text-secondary)">jdiegu</span>
            </span>
            <span class="block text-[12px] mt-0.5" style="color: var(--text-muted); opacity: 0.7">
              · solo la página ·
            </span>
          </div>

          <a
            :href="`https://wa.me/${whatsappPhone}`"
            target="_blank"
            rel="noopener"
            class="group flex items-center gap-2 text-[13px] font-medium px-4 py-2 rounded-full no-underline transition-all hover:scale-105 active:scale-95"
            :style="{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-secondary)',
            }"
          >
            <svg class="w-3.5 h-3.5 transition-transform group-hover:scale-110" style="color: #25D366" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Mensaje a jdiegu
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "../../store/auth";
import { useTheme } from "../../composables/useTheme";
import {
  CONTACT_PHONE,
  WHATSAPP_GROUP,
  WHATSAPP_PHONE,
} from "../../config/constants";

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const { isDark, toggleTheme } = useTheme();

const whatsappGroupLink = computed(() => WHATSAPP_GROUP || "#");
const whatsappPhone = WHATSAPP_PHONE;

const FEMININE_ICONS = {
  popcorn:
    `<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="8.1" cy="9.4" r="3.1"/><circle cx="15.9" cy="9.4" r="3.1"/><circle cx="12" cy="5.6" r="3.2"/><circle cx="10" cy="9.8" r="2.4"/><circle cx="14" cy="9.8" r="2.4"/><path d="M5.4 12.6h13.2l-.6 2.6H6l-.6-2.6z"/><path d="M6.8 15.2h10.4l-1 4.6c-.2 1-.9 1.7-1.9 1.7H9.7c-1 0-1.7-.7-1.9-1.7l-1-4.6z"/></svg>`,
  play:
    `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>`,
  camera:
    `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/></svg>`,
  music:
    `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>`,
  mic:
    `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/></svg>`,
  movie:
    `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"/></svg>`,
  bag:
    `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 6h-2c0-2.21-1.79-4-4-4S8 3.79 8 6H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6-2c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2z"/></svg>`,
  drink:
    `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 5V3H3v2l8 9v5H6v2h12v-2h-5v-5l8-9zM7.43 7L5.66 5h12.69l-1.78 2H7.43z"/></svg>`,
  flower:
    `<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="6" r="3.1"/><circle cx="17.3" cy="9.6" r="3.1"/><circle cx="14.7" cy="15.9" r="3.1"/><circle cx="9.3" cy="15.9" r="3.1"/><circle cx="6.7" cy="9.6" r="3.1"/><circle cx="12" cy="12" r="2.8"/></svg>`,
  crown:
    `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 17.5h16v2.5H4zM5.8 16L4 6.2l5 4.4L12 5.5l3 5.1 5-4.4L18.2 16H5.8z"/></svg>`,
  dress:
    `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c1.1 0 2.1.6 2.7 1.5l3.1 4.4 1.9 1.3-.7 8.3c-.1 1.1-1 1.9-2.1 1.9H7.5c-1.1 0-2-.8-2.1-1.9l-.7-8.3 1.9-1.3 2.9-4.4C9.9 2.6 10.9 2 12 2z"/></svg>`,
  headset:
    `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1a9 9 0 00-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-4v8h3c1.66 0 3-1.34 3-3v-7a9 9 0 00-9-9z"/></svg>`,
};

const SHAPE_SPOTS = [
  [2, 3, 28], [5, 22, 12], [1, 45, 34], [4, 68, 10], [8, 88, 18], [12, 12, 8],
  [14, 38, 30], [10, 58, 14], [17, 78, 22], [20, 95, 40], [25, 6, 16], [30, 28, 36],
  [24, 50, 6], [35, 72, 26], [28, 85, 11], [40, 15, 32], [44, 40, 9], [48, 60, 24],
  [42, 80, 13], [52, 4, 38], [55, 35, 7], [58, 55, 20], [50, 75, 15], [62, 92, 42],
  [65, 10, 10], [68, 30, 28], [60, 48, 5], [72, 65, 17], [78, 82, 33], [75, 18, 12],
  [82, 42, 44], [85, 55, 8], [80, 70, 21], [88, 8, 14], [92, 30, 30], [86, 48, 6],
  [95, 60, 25], [90, 75, 11], [96, 88, 36], [7, 75, 9], [22, 46, 19], [37, 90, 7],
  [46, 24, 23], [56, 42, 13], [70, 52, 31], [77, 38, 10], [84, 22, 16], [93, 50, 27],
  [9, 40, 24], [18, 68, 16], [33, 8, 30], [44, 88, 14], [58, 33, 20], [70, 62, 26], [82, 25, 12], [90, 75, 18],
];

const PINK_TONES = ["#9E0E54", "#C01466", "#E02479", "#F63F8D", "#FF6BA9"];
const ICON_KEYS = Object.keys(FEMININE_ICONS);

const floatingShapes = SHAPE_SPOTS.map(([top, left, size], i) => {
  const palette = PINK_TONES[(i + Math.floor(i / 12)) % PINK_TONES.length];
  return {
    id: i,
    svg: FEMININE_ICONS[ICON_KEYS[i % ICON_KEYS.length]],
    style: {
      width: `${size}px`,
      height: `${size}px`,
      top: `${top}%`,
      left: `${left}%`,
      color: palette,
      opacity: 0.06 + (i % 5) * 0.02,
      animation: `float-drift ${14 + (i % 8)}s ease-in-out ${(i % 9) * 0.7}s infinite`,
    },
  };
});

const activeTab = ref(route.query.register === "true" ? "register" : "login");

const showPass = ref(false);
const errorMsg = ref("");

const tabs = [
  {
    id: "login",
    label: "Iniciar sesion",
  },
  {
    id: "register",
    label: "Registrarse",
  },
];

const loginForm = reactive({
  username: "",
  password: "",
});

const registerForm = reactive({
  username: "",
  password: "",
  phone: "",
});

async function handleLogin() {
  errorMsg.value = "";

  try {
    const result = await authStore.login({
      username: loginForm.username,
      password: loginForm.password,
    });

    if (result.success) {
      router.push("/app");
    } else {
      errorMsg.value = result.message;
    }
  } catch {
    errorMsg.value = "Error al iniciar sesion";
  }
}

async function handleRegister() {
  errorMsg.value = "";

  try {
    const result = await authStore.register({
      username: registerForm.username,
      password: registerForm.password,
      phone: registerForm.phone,
    });

    if (result.success) {
      router.push("/app");
    } else {
      errorMsg.value = result.message;
    }
  } catch {
    errorMsg.value = "Error al registrar usuario";
  }
}
</script>

<style scoped>
.login-page {
  background: var(--bg-page);
}

.bg-orbs .orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
}

.orb-1 {
  width: 500px;
  height: 500px;
  top: -15%;
  right: -10%;
  background: var(--rose-primary);
  opacity: 0.07;
  animation: orb-drift 18s ease-in-out infinite alternate;
}

.orb-2 {
  width: 400px;
  height: 400px;
  bottom: -10%;
  left: -8%;
  background: var(--rose-primary);
  opacity: 0.05;
  animation: orb-drift 22s ease-in-out infinite alternate-reverse;
}

.orb-3 {
  width: 300px;
  height: 300px;
  top: 30%;
  left: 20%;
  background: #ff6ba9;
  opacity: 0.05;
  animation: orb-drift 15s ease-in-out infinite alternate;
}

.orb-4 {
  width: 200px;
  height: 200px;
  bottom: 20%;
  right: 15%;
  background: #e02479;
  opacity: 0.03;
  animation: orb-drift 20s ease-in-out infinite alternate-reverse;
}

@keyframes orb-drift {
  0% {
    transform: translate(0, 0) scale(1);
  }

  50% {
    transform: translate(30px, -20px) scale(1.1);
  }

  100% {
    transform: translate(-20px, 15px) scale(0.95);
  }
}

.floating-shapes .shape {
  position: absolute;
}

.floating-shapes .shape svg {
  width: 100%;
  height: 100%;
}

.floating-shapes .shape {
  will-change: transform;
}

@keyframes float-drift {
  0% {
    transform: translateY(0) rotate(0deg) scale(1);
  }
  25% {
    transform: translateY(-12px) rotate(-3deg) scale(1.05);
  }
  50% {
    transform: translateY(-4px) rotate(2deg) scale(0.98);
  }
  75% {
    transform: translateY(-15px) rotate(-2deg) scale(1.03);
  }
  100% {
    transform: translateY(0) rotate(0deg) scale(1);
  }
}

.grid-dots {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(
    circle,
    var(--rose-primary) 0.8px,
    transparent 0.8px
  );
  background-size: 48px 48px;
  opacity: 0.035;
}

.animate-slide-up {
  animation: slide-up 0.7s cubic-bezier(0.21, 1.02, 0.73, 1) both;
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(24px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.logo-container {
  position: relative;
  width: 116px;
  height: 116px;
}

@media (min-width: 640px) {
  .logo-container {
    width: 132px;
    height: 132px;
  }
}

.logo-ring {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  padding: 3px;

  background: linear-gradient(135deg, #FFC2D7, #FF6BA9, #E02479, #FFC2D7);

  background-size: 300% 300%;
  animation: ring-rotate 6s ease-in-out infinite;

  position: relative;
  z-index: 1;


  isolation: isolate;
}

.logo-ring::before {
  content: "";

  position: absolute;
  inset: -4px;

  border-radius: 50%;
  padding: 2px;

  background: conic-gradient(
    from 0deg,

    transparent 0deg,
    transparent 48deg,

    #E02479 68deg,
    #FFC2D7 82deg,
    #ffffff 94deg,
    #FFC2D7 106deg,
    #E02479 122deg,

    transparent 145deg,
    transparent 360deg
  );

  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);

  -webkit-mask-composite: xor;

  mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);

  mask-composite: exclude;

  animation:
    logo-border-spin 4.5s linear infinite,
    logo-border-opacity 3s ease-in-out infinite;

  opacity: 0.9;

  z-index: -1;

  filter: drop-shadow(0 0 3px rgba(255, 194, 215, 0.55))
    drop-shadow(0 0 9px rgba(255, 194, 215, 0.22));

  pointer-events: none;
}

.logo-ring::after {
  content: "";

  position: absolute;
  inset: -2px;

  border-radius: 50%;
  padding: 1px;

  background: conic-gradient(
    from 180deg,
    transparent,
    rgba(255, 194, 215, 0.35),
    transparent 30%
  );

  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);

  -webkit-mask-composite: xor;

  mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);

  mask-composite: exclude;

  animation: logo-secondary-spin 8s linear infinite reverse;

  opacity: 0.45;

  z-index: -1;

  pointer-events: none;
}

@keyframes logo-border-spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes logo-secondary-spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes logo-border-opacity {
  0%,
  100% {
    opacity: 0.72;
  }

  50% {
    opacity: 1;
  }
}

@keyframes ring-rotate {
  0%,
  100% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }
}

.logo-inner {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;

  background: var(--bg-page);

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 4px;

  position: relative;
  z-index: 2;
}

.logo-img {
  width: 100%;
  height: 100%;

  object-fit: cover;
  border-radius: 50%;

  position: relative;
  z-index: 2;
}

.logo-glow {
  position: absolute;
  inset: -12px;

  border-radius: 50%;

  background: radial-gradient(
    circle,
    rgba(224, 36, 121, 0.24) 0%,
    rgba(224, 36, 121, 0.1) 30%,
    transparent 70%
  );

  z-index: 0;

  animation: glow-pulse 4s ease-in-out infinite;

  pointer-events: none;
}

@keyframes glow-pulse {
  0%,
  100% {
    opacity: 0.45;
    transform: scale(0.98);
  }

  50% {
    opacity: 0.95;
    transform: scale(1.08);
  }
}

.login-title {
  font-family: "Playfair Display", Georgia, serif;
  font-weight: 700;

  background: linear-gradient(135deg, var(--rose-primary), #FF6BA9);

  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.login-subtitle {
  color: var(--text-muted);
  letter-spacing: 0.03em;
}

.login-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 1.25rem;

  position: relative;

  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.04),
    0 4px 24px rgba(224, 36, 121, 0.06),
    0 12px 48px rgba(0, 0, 0, 0.03);

  backdrop-filter: blur(12px);

  transition:
    box-shadow 0.3s ease,
    border-color 0.3s ease;
}

.login-card::before {
  content: "";

  position: absolute;
  inset: -1px;

  border-radius: inherit;
  padding: 1px;

  background: linear-gradient(
    var(--card-border-angle, 0deg),
    var(--rose-primary),
    transparent 40%,
    transparent 60%,
    var(--rose-primary)
  );

  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);

  mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);

  -webkit-mask-composite: xor;
  mask-composite: exclude;

  opacity: 0;

  transition: opacity 0.4s ease;

  pointer-events: none;

  z-index: 1;
}

.login-card:hover::before {
  opacity: 1;
  animation: border-rotate 4s linear infinite;
}

.login-card:hover {
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.04),
    0 8px 32px rgba(224, 36, 121, 0.1),
    0 16px 56px rgba(0, 0, 0, 0.04);

  border-color: rgba(224, 36, 121, 0.15);
}

.dark .login-card {
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.2),
    0 4px 24px rgba(0, 0, 0, 0.15),
    0 12px 48px rgba(0, 0, 0, 0.1);
}

.dark .login-card:hover {
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.2),
    0 8px 32px rgba(255, 194, 215, 0.08),
    0 16px 56px rgba(0, 0, 0, 0.15);
}

@property --card-border-angle {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}

@keyframes border-rotate {
  to {
    --card-border-angle: 360deg;
  }
}


.tabs-container {
  gap: 0.25rem;
}

.tab-active {
  background: var(--rose-primary);
  color: white;

  box-shadow: 0 2px 10px rgba(224, 36, 121, 0.35);
}

.tab-inactive {
  color: var(--text-muted);
  background: transparent;
}

.tab-inactive:hover {
  color: var(--text-secondary);
  background: rgba(224, 36, 121, 0.05);
}

.field {
  position: relative;
}

.field-label {
  display: flex;
  align-items: center;

  gap: 0.5rem;

  font-size: 0.8125rem;
  font-weight: 600;

  color: var(--text-secondary);

  margin-bottom: 0.35rem;
  padding-left: 0.125rem;
}

.field-label-icon {
  width: 1rem;
  height: 1rem;

  color: var(--rose-primary);

  opacity: 0.7;

  flex-shrink: 0;
}

.field-input-wrap {
  position: relative;
}

.field-input {
  width: 100%;

  padding: 0.6rem 0.875rem;

  border-radius: 0.875rem;

  font-size: 0.875rem;

  color: var(--text-primary);

  background: var(--bg-input);

  border: 1.5px solid var(--border-color);

  transition: all 0.25s ease;

  outline: none;

  line-height: 1.4;
}

.field-input::placeholder {
  color: var(--text-muted);
  opacity: 0.6;
}

.field-input:focus {
  border-color: var(--rose-primary);

  box-shadow: 0 0 0 3px rgba(224, 36, 121, 0.1);

  background: var(--bg-card);
}

.field-input-action {
  padding-right: 3rem;
}

.field-action {
  position: absolute;

  right: 0.5rem;
  top: 50%;

  transform: translateY(-50%);

  width: 2rem;
  height: 2rem;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 0.5rem;

  color: var(--rose-primary);

  opacity: 0.7;

  transition: all 0.2s;

  cursor: pointer;

  background: transparent;
  border: none;
}

.field-action:hover {
  opacity: 1;
  background: var(--rose-lighter);
}

.error-msg {
  display: flex;
  align-items: center;

  gap: 0.625rem;

  padding: 0.75rem 1rem;

  border-radius: 0.875rem;

  font-size: 0.8125rem;

  border: 1px solid rgba(212, 74, 74, 0.2);

  background: var(--error-bg);

  color: var(--error);
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }

  20% {
    transform: translateX(-6px);
  }

  40% {
    transform: translateX(5px);
  }

  60% {
    transform: translateX(-4px);
  }

  80% {
    transform: translateX(3px);
  }
}

.animate-shake {
  animation: shake 0.4s ease;
}

.submit-btn {
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 0.5rem;

  padding: 0.8rem 1.5rem;

  border-radius: 0.875rem;

  font-size: 0.9375rem;
  font-weight: 600;

  color: white;

  background: var(--rose-gradient);

  border: none;

  cursor: pointer;

  transition: all 0.3s ease;

  position: relative;

  overflow: hidden;

  line-height: 1.4;
}

.submit-btn::before {
  content: "";

  position: absolute;
  inset: 0;

  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.15) 0%,
    transparent 50%
  );

  opacity: 0;

  transition: opacity 0.3s;
}

.submit-btn:hover::before {
  opacity: 1;
}

.submit-btn:hover {
  box-shadow: 0 6px 24px rgba(224, 36, 121, 0.4);

  transform: translateY(-1px);
}

.submit-btn:active {
  transform: translateY(0);

  box-shadow: 0 2px 12px rgba(224, 36, 121, 0.3);
}

.submit-btn:disabled {
  opacity: 0.6;

  cursor: not-allowed;

  transform: none;

  box-shadow: none;
}

.theme-toggle {
  display: flex;
  align-items: center;

  gap: 0.4rem;

  padding: 0.5rem 0.875rem;

  border-radius: 0.75rem;

  font-size: 0.75rem;
  font-weight: 500;

  color: var(--text-secondary);

  background: transparent;

  border: 1px solid var(--border-color);

  cursor: pointer;

  transition: all 0.2s ease;
}

.theme-toggle:hover {
  background: var(--bg-surface);

  border-color: var(--rose-light);

  color: var(--rose-primary);
}

@media (prefers-reduced-motion: reduce) {
  .logo-ring,
  .logo-ring::before,
  .logo-ring::after,
  .logo-glow,
  .bg-orbs .orb,
  .floating-shapes .shape,
  .animate-slide-up {
    animation: none !important;
  }
}
</style>
```
