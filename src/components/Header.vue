<template>
    <header class="header">
        <div class="wrap">
            <a href="/" class="header__logo">
                <img src="@/assets/images/logo.svg">
            </a>
            <nav class="navigation">
                <ul class="navigation-list">
                    <li class="navigation-list__item">
                        <RouterLink to="/" active-class="active" exact-active-class="active">Dashboard</RouterLink>
                    </li>
                    <li class="navigation-list__item">
                        <RouterLink to="/search" active-class="active" exact-active-class="active">Search</RouterLink>
                    </li>
                    <!-- <router-link tag="li" class="navigation-list__item" exact-active-class="active" to="/help">Help</router-link> -->
                </ul>
            </nav>
        </div>
    </header>
</template>