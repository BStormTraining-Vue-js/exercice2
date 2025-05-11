<script setup>
import { FloatLabel, InputNumber, Button, DatePicker, Select } from "primevue";
import { computed, ref } from "vue";

/***** exercice 2.1 *****/
const h = ref(null);
const w = ref(null);
const BMI = ref(null);
const validBMI = computed(() => h.value && w.value);
const computeBMI = () => { 
    BMI.value = w.value / ((h.value/100) ** 2);
}
/***** end exercice 2.1 *****/

/***** exercice 2.2 *****/
const birthDate = ref(null);
const age = ref(null);
const ageType = ref('Année');
const validBirthDate = computed(() => birthDate.value && birthDate.value.getTime() < Date.now());
const computeAge = () => {
    switch(ageType.value) {
        case 'Année':
            const date = new Date();
            let a = date.getFullYear() - birthDate.value.getFullYear();
            date.setFullYear(birthDate.value.getFullYear());
            if(date < birthDate.value) {
                a--;
            }
            age.value = `${a} ans`;
            break;
        case 'Jours':
            const ms = Date.now() - birthDate.value.getTime();
            age.value = `${Math.floor(ms / 86400000)} jours`;
            break;
    }
}
/***** end exercice 2.2 *****/

/***** exercice 2.3 *****/
const amount = ref(null);
const nbYears = ref(null);
const yearRate = ref(null);
const amortizations = ref(null);
const total = ref(null);

const validData = () => amount.value && nbYears.value && yearRate.value;

const computeAmortizations = () => {
    const nbMonths = nbYears.value * 12;
    const monthRate = yearRate.value / 12 / 100;
    const amountPerMonth = ((amount.value * monthRate) / (1 - (1 + monthRate)**(-nbMonths)));

    let amountRemained = amount.value;

    const table = [];
    for(let i = 1; i <= nbMonths; i++) {
        const interestAmount = amountRemained * monthRate;
        const amountRefund = amountPerMonth - interestAmount;
        amountRemained -= amountRefund;
        table.push({ month: i, amountPerMonth, amountRefund, interestAmount, amountRemained });
    }
    amortizations.value = table;
    total.value = (Math.round(amountPerMonth * 100) * nbMonths / 100);
}
/***** end exercice 2.3 *****/
</script>

<template>
<div id="root" class="m-3">
    <div class="panel">
        <h1 class="text-bold text-2xl">Exercice 2.1</h1>
        <hr>
        <form class="flex flex-col gap-3" @submit.prevent="computeBMI">
            <div>
                <FloatLabel variant="on">
                    <InputNumber v-model.number="h"></InputNumber>
                    <label>Taille (cm)</label>
                </FloatLabel>
            </div>
            <div>
                <FloatLabel variant="on">
                    <InputNumber v-model.number="w"></InputNumber>
                    <label>Poids (kg)</label>
                </FloatLabel>
            </div>
            <Button type="submit" :disabled="!validBMI" label="Calculer votre IMC"></Button>
        </form>
        <p class="text-2xl" v-if="BMI && validBMI">Votre IMC : {{ BMI.toFixed(1) }}</p>
    </div>

    <div class="panel">
        <h1 class="text-bold text-2xl">Exercice 2.2</h1>
        <hr>
        <form class="flex flex-col gap-3" @submit.prevent="computeAge">
            <div>
                <FloatLabel variant="on">
                    <DatePicker dateFormat="dd/mm/yy" v-model="birthDate" />
                    <label>Date de naissance</label>
                </FloatLabel>
            </div>
            <div>
                <FloatLabel variant="on">
                    <Select v-model="ageType" :options="['Année', 'Jours']"></Select>
                    <label>Type d'âge</label>
                </FloatLabel>
            </div>
            <Button type="submit" :disabled="!validBirthDate" label="Calculer votre age"></Button>
        </form>
        <p class="text-2xl" v-if="age && validBirthDate">Votre age : {{ age }}</p>
    </div>

    <div class="panel">
        <h1 class="text-bold text-2xl">Exercice 2.3</h1>
        <hr>
        <form class="flex flex-col gap-3" @submit.prevent="computeAmortizations">
            <div>
                <FloatLabel variant="on">
                    <InputNumber v-model.number="amount"></InputNumber>
                    <label>Montant en €</label>
                </FloatLabel>
            </div>
            <div>
                <FloatLabel variant="on">
                    <InputNumber v-model.number="nbYears"></InputNumber>
                    <label>Nombre d'années</label>
                </FloatLabel>
            </div>
            <div>
                <FloatLabel variant="on">
                    <InputNumber v-model.number="yearRate" :maxFractionDigits="2"></InputNumber>
                    <label>Taux en %</label>
                </FloatLabel>
            </div>
            <Button type="submit" :disabled="!validData" label="Afficher le tableau d'amortissements"></Button>
        </form>
        <table v-if="amortizations">
            <thead>
                <tr>
                    <th>Mois</th>
                    <th>Mensualité</th>
                    <th>Capital remboursé</th>
                    <th>Intérêts</th>
                    <th>Solde restant</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item of amortizations" :key="item.month">
                    <td>{{ item.month }}</td>
                    <td>{{ item.amountPerMonth.toFixed(2) }}</td>
                    <td>{{ item.amountRefund.toFixed(2) }}</td>
                    <td>{{ item.interestAmount.toFixed(2) }}</td>
                    <td>{{ item.amountRemained.toFixed(2) }}</td>
                </tr>
            </tbody>
            <tfoot>
                <tr class="font-bold">
                    <td>Coût total :</td>
                    <td>{{ total.toFixed(2) }}</td>
                </tr>
            </tfoot>
        </table>
    </div>   
</div>
</template>

<style scoped></style>