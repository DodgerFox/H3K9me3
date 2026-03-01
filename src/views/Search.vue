<template>
  <main class="main">
    <Header />

    <section class="section search">
      <form class="wrap" @submit.prevent="sendData()">
        <div class="search-block">
            <div class="search-header">
                <h4>Histone modifications</h4>
                <div class="info">
                    <div class="info__window">
                        <p>Choose from one to ten histone modifications</p>
                    </div>
                </div>
            </div>
            <div class="search-wrap">
                <div class="checkbox">
                    <input type="checkbox" id="histone1" v-model="histones.H3K27ac"/>
                    <label for="histone1">H3K27ac</label>
                </div>
                <div class="checkbox">
                    <input type="checkbox" id="histone2" v-model="histones.H3K27me3"/>
                    <label for="histone2">H3K27me3</label>
                </div>
                <div class="checkbox">
                    <input type="checkbox" id="histone3" v-model="histones.H3K36me3"/>
                    <label for="histone3">H3K36me3</label>
                </div>
                <div class="checkbox">
                    <input type="checkbox" id="histone4" v-model="histones.H3K4me1"/>
                    <label for="histone4">H3K4me1</label>
                </div>
                <div class="checkbox">
                    <input type="checkbox" id="histone5" v-model="histones.H3K4me2"/>
                    <label for="histone5">H3K4me2</label>
                </div>
                <div class="checkbox">
                    <input type="checkbox" id="histone6" v-model="histones.H3K4me3"/>
                    <label for="histone6">H3K4me3</label>
                </div>
                <div class="checkbox">
                    <input type="checkbox" id="histone7" v-model="histones.H3K9ac"/>
                    <label for="histone7">H3K9ac</label>
                </div>
                <div class="checkbox">
                    <input type="checkbox" id="histone8" v-model="histones.H3K9me3"/>
                    <label for="histone8">H3K9me3</label>
                </div>
                <div class="checkbox">
                    <input type="checkbox" id="histone9" v-model="histones.H3K79me2"/>
                    <label for="histone9">H3K79me2</label>
                </div>
                <div class="checkbox">
                    <input type="checkbox" id="histone10" v-model="histones.H4K20me1"/>
                    <label for="histone10">H4K20me1</label>
                </div>
            </div>
        </div>
        <div class="search-block search-block_middle">
            <div class="search-header">
                <h4>lncRNA/lncRNA ID</h4>
                <div class="info">
                    <div class="info__window">
                        <p>Filter by lncRNAs that affect histone modifications selected above.</p>
                        <p>Add ensembl ids or names of lncRNA one by one with Enter, or load file with lncRNAs in a column.</p>
                    </div>
                </div>
            </div>
            <div class="search-wrap">
                <div class="search-string">
                    <!-- <div class="input-search">
                        <input type="text" id="lncRNA">
                    </div> -->
                    <div class="input-add">
                        <input type="text" id="lncRNA" placeholder="Add one by one via 'Enter'" @keydown.enter.prevent="setElement('lncrna')" v-model="lncrnaInput">
                    </div>
                    <input
                        type="file"
                        class="button violet"
                        id="lncrna-file"
                        accept=".txt"
                        @change="onLncrnaFile"
                    />
                    <div class="info black">
                        <div class="info__window">
                            <p>File should be in txt format, and max 2mb size.</p>
                        </div>
                    </div>
                    <div class="clear" @click="clearList('lncrna')" v-show="lncrna.length > 0">
                        <p>Clear</p>
                    </div>
                </div>
                <div class="search-output" v-if="lncrna.length > 0">
                    <div class="search-output__item" @click="lncrna.splice(index, 1)" v-for="(rna, index) in lncrna" :key="index" :rna="rna">{{ rna }}</div>
                </div>
                <div class="button button_show" v-if="lncrna.length > 2" @click="showAll('lncrna')">
                    <p>Show all {{ lncrna.length }}</p>
                </div>
            </div>
        </div>
        <div class="search-block search-block_middle">
            <div class="search-header">
                <h4>Gene/Gene ID</h4>
                <div class="info">
                    <div class="info__window">
                        <p>Filter by genes that have (in the body or + 1000bp) the modifications selected above.</p>
                        <p>Add gene ids or names one by one with Enter, or load file with genes in a column.</p>
                    </div>
                </div>
            </div>
            <div class="search-wrap">
                <div class="search-string">
                    <div class="input-add">
                        <input type="text" id="Gene" placeholder="Add one by one via 'Enter'" @keydown.enter.prevent="setElement('genes')" v-model="genesInput">
                    </div>
                    <input
                        type="file"
                        class="button violet"
                        id="genes-file"
                        accept=".txt"
                        @change="onGenesFile"
                    />
                    <div class="info black">
                        <div class="info__window">
                            <p>File should be in txt format, and max 2mb size.</p>
                        </div>
                    </div>
                    <div class="clear" @click="clearList('genes')" v-show="genes.length > 0">
                        <p>Clear</p>
                    </div>
                </div>
                <div class="search-output" v-if="genes.length > 0">
                    <div class="search-output__item" @click="genes.splice(index, 1)" v-for="(rna, index) in genes" :key="index" :rna="rna">{{ rna }}</div>
                </div>
                <div class="button button_show" v-if="genes.length > 2" @click="showAll('genes')">
                    <p>Show all {{ genes.length }}</p>
                </div>
            </div>
        </div>
        <div class="search-block search-block_middle">
            <div class="search-header">
                <h4>Coordinates</h4>
                <div class="info">
                    <div class="info__window">
                        <p>Filter by genome loci.</p>
                        <p>Add tab separated gene loci coords in bed format, each on a new line, or load bed file.</p>
                    </div>
                </div>
            </div>
            <div class="search-wrap">
                <div class="search-string">
                    <textarea ref="ta" class="textarea" id="coords" cols="30" rows="8" placeholder="Add one by one via tab" v-model="coordsInput" @keyup="changeCoords" @keydown.tab.prevent="setTab()"></textarea>
                </div>
                <div class="search-string">
                    <div class="button" v-if="coords.length > 2" @click="showAll('coords')">
                        <p>Show all {{ coords.length }}</p>
                    </div>
                    <input
                        type="file"
                        class="button violet"
                        id="coords-file"
                        accept=".txt"
                        @change="onCoordsFile"
                    />
                    <div class="info black">
                        <div class="info__window">
                            <p>File should be in txt format, and max 2mb size.</p>
                        </div>
                    </div>
                    <div class="clear" @click="clearList('coords')" v-show="coords.length > 0">
                        <p>Clear</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="search-block search-block_middle">
            <div class="search-header">
                <h4>Correlation threshold</h4>
                <div class="info">
                    <div class="info__window">
                        <p>Filter by strength of interaction between histone modifications signal and lncRNA expression.</p>
                        <p>Choose sign and thresholds of ChIP-Seq signal - lncRNA expression correlations.</p>
                    </div>
                </div>
            </div>
            <div class="search-wrap">
                <div class="search-string">
                    <div class="checkbox">
                        <input type="checkbox" id="plus" v-model="plus"/>
                        <label for="plus">+</label>
                    </div>
                    <div class="checkbox">
                        <input type="checkbox" id="minus" v-model="minus"/>
                        <label for="minus">—</label>
                    </div>
                </div>
                <div class="search-string">
                    <Slider v-show="plus" name="plus"/>
                </div>
                <div class="search-string">
                    <Slider v-show="minus" name="minus"/>
                </div>
            </div>
        </div>
        <div class="search-button">
            <input class="button" type="submit" value="Search" />
        </div>
      </form>
    </section>
    <section class="modal" v-if="modal.open">
        <div class="modal-close" @click="modal.open = false">
            <img src="@/assets/images/icon_close.svg" alt="">
        </div>
        <div class="wrap">
            <div class="modal-body">
                <h2 class="modal-title">All choisen {{ modal.title }}</h2>
                <div class="modal-list" v-if="modal.data && modal.title === 'lncrna'">
                    <div class="search-output__item" @click="lncrna.splice(index, 1)" v-for="(rna, index) in modal.data" :key="index" :rna="rna">{{ rna }}</div>
                </div>
                <div class="modal-list" v-if="modal.data && modal.title === 'genes'">
                    <div class="search-output__item" @click="genes.splice(index, 1)" v-for="(rna, index) in modal.data" :key="index" :rna="rna">{{ rna }}</div>
                </div>
                <div class="modal-list" v-if="modal.data && modal.title === 'coords'">
                    <div class="search-output__item" @click="coords.splice(index, 1)" v-for="(rna, index) in modal.data" :key="index" :rna="rna">{{ rna }}</div>
                </div>
            </div>
        </div>
    </section>
    <Loader />
    <Notification v-if="warning.open" :title="warning.title"/>
    <Footer />
  </main>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Slider from '@/components/ui/Slider'
import Loader from '@/components/Loader'
import Notification from '@/components/Notification'

const store = useStore()
const router = useRouter()
const ta = ref(null)

const modal = reactive({
    open: false,
    data: null,
    title: null
})

const warning = reactive({
    open: false,
    title: 'Choose modification'
})

const lncrna = ref([])
const genes = ref([])
const coords = ref([])
const lncrnaInput = ref('')
const genesInput = ref('')
const coordsInput = ref('')
const plus = ref(false)
const minus = ref(false)

const histones = reactive({
    H3K27ac: false,
    H3K27me3: false,
    H3K36me3: false,
    H3K4me1: false,
    H3K4me2: false,
    H3K4me3: false,
    H3K9ac: false,
    H3K9me3: false,
    H3K79me2: false,
    H4K20me1: false
})

const listByName = (name) => ({
    lncrna,
    genes,
    coords
})[name]

const changeCoords = () => {
    coords.value = coordsInput.value
        .split('\n')
        .filter((item) => item.trim().length > 0)
        .map((item) => item.split('\t'))
}

const setTab = () => {
    if (!ta.value) return
    const cursorPosition = ta.value.selectionStart
    const str = coordsInput.value
    let newStr = ''
    for (const key in str) {
        newStr = Number(key) === cursorPosition - 1 ? newStr + str[key] + '\t' : newStr + str[key]
    }
    coordsInput.value = newStr
}

const showAll = (name) => {
    modal.open = true
    modal.data = listByName(name).value
    modal.title = name
}

const clearList = (name) => {
    listByName(name).value = []
}

const readFileList = (file, target) => {
    const reader = new FileReader()
    reader.onload = (e) => {
        const dataArray = e.target.result.split('\n').filter((item) => item.trim().length > 0)
        dataArray.forEach((element) => {
            target.value.push(element)
        })
    }
    reader.readAsText(file)
}

const readCoordsFile = (file) => {
    const reader = new FileReader()
    reader.onload = (e) => {
        const strings = e.target.result.split('\n').filter((item) => item.trim().length > 0)
        coords.value = strings.map((element) => element.split('\t'))
        showWarning('Coords was uploaded!')
        coordsInput.value = e.target.result
    }

    reader.readAsText(file)
}

const onLncrnaFile = (event) => {
    const file = event.target.files?.[0]
    if (file) readFileList(file, lncrna)
    event.target.value = ''
}

const onGenesFile = (event) => {
    const file = event.target.files?.[0]
    if (file) readFileList(file, genes)
    event.target.value = ''
}

const onCoordsFile = (event) => {
    const file = event.target.files?.[0]
    if (file) readCoordsFile(file)
    event.target.value = ''
}

const setElement = (name) => {
    if (name === 'coords') {
        const strings = coordsInput.value.split('\n').filter((item) => item.trim().length > 0)
        strings.forEach((element) => {
            coords.value.push(element.split('\t'))
        })
    } else {
        const target = listByName(name)
        const value = name === 'lncrna' ? lncrnaInput.value : genesInput.value
        if (value) target.value.push(value)
    }

    if (name === 'lncrna') lncrnaInput.value = ''
    if (name === 'genes') genesInput.value = ''
    if (name === 'coords') coordsInput.value = ''
}

const sendData = async () => {
    const selectedHistones = []
    let modifChosen = false
    for (const key in histones) {
        if (histones[key]) {
            selectedHistones.push(key)
            modifChosen = true
        }
    }

    if (modifChosen && (plus.value || minus.value || coords.value.length > 0 || lncrna.value.length > 0 || genes.value.length > 0)) {
        const searchData = {
            hm: selectedHistones,
            lncrna: lncrna.value,
            genes: genes.value,
            coords: coords.value,
            thresholds_choisen: [plus.value, minus.value]
        }

        store.dispatch('setLoader', true)
        await store.dispatch('setSearch', searchData)
        const result = await store.dispatch('search', [searchData, 1, 10])
        store.dispatch('setLoader', false)
        result ? router.push('/result') : showWarning('Something went wrong')
    } else if (modifChosen && (!plus.value || !minus.value || coords.value.length === 0 || lncrna.value.length === 0 || genes.value.length === 0)) {
        showWarning('Сhoose some filters')
    } else {
        showWarning('Сhoose some modifications and filters')
    }
}

const showWarning = (title) => {
    if (title) warning.title = title
    warning.open = !warning.open
    setTimeout(() => {
        warning.open = !warning.open
    }, 4000)
}
</script>
