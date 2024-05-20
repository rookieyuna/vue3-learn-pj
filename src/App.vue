<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { CardInfo, IssuanceHistory, IssuanceInfo } from './constant';

const issuanceInfo: IssuanceInfo = {
	isLogin: 'Y',
	userName: '홍*동',
	result: [
		{
			date: '20240401',
			cardList: [
				{
					cardName: '로로카드',
					rpc: '01',
					ingbCode: 'N001',
					imgPath: '/img/icon',
					status: '',
				},
				{
					cardName: '키키카드',
					rpc: '01',
					ingbCode: 'N002',
					imgPath: '/img/icon',
					status: '',
				},
				{
					cardName: '루키카드',
					rpc: '03',
					ingbCode: 'N003',
					imgPath: '/img/icon',
					status: '',
				},
			],
		},
		{
			date: '20240512',
			cardList: [
				{
					cardName: '로로카드',
					rpc: '01',
					ingbCode: 'N001',
					imgPath: '/img/icon',
					status: '',
				},
				{
					cardName: '마미카드',
					rpc: '03',
					ingbCode: 'N003',
					imgPath: '/img/icon',
					status: '',
				},
			],
		},
	],
};


const HistoryList = ref<IssuanceHistory[]>([]);

onMounted(() => {
	카드정보세팅();
});

let 응답코드 = '';
let 오류코드 = '';

function 카드정보세팅() {

	HistoryList.value = issuanceInfo.result;
	if (HistoryList.value.length > 0) {
		const _statusKeys: string[] = []
		
		HistoryList.value.forEach((history, idx) => {
			const grouped: Record<string, CardInfo[]> = {};
			history.cardList.forEach((card, idx2)=>{
				card.status = 카드상태세팅(card) || ''
				
				if (!grouped[card.status]) {
					grouped[card.status] = [];
					_statusKeys.push(card.status)
				}
				grouped[card.status].push(card);
			});
			
			history.grouped = grouped
			history.statusKeys = _statusKeys
			console.log('>>history', history)
		});
	}
	console.log('HistoryList', HistoryList)
}

function 카드상태세팅(card: CardInfo) {
	if(card.rpc === '01') {
		return '신청'
	} else if (card.rpc === '03') {
		return '배송'
	}
}

const 상태값 = ['신청', '배송']
</script>

<template>
	<div>
		<h2>카드목록만들기</h2>
		<div v-for="(history, idx) in HistoryList" :key="idx">
			<h3>날짜: {{ history.date }}</h3>
			<div v-for="(status, idx2) in history.statusKeys" :key="idx2">
				<h4>배송상태: {{ status }}</h4>
				<table border="1" width="400px">
					<thead>
						<th>카드명</th>
						<th>배송상태</th>
						<th>기타</th>
					</thead>
					<tr v-for="(card, idx3) in history.grouped[status]">
						<td>{{ card.cardName }}</td>
						<td>{{ card.status }}</td>
						<td>{{ card.imgPath }}</td>
					</tr>
				</table>
			</div>
		</div>
	</div>
</template>

<style scoped>
header {
	line-height: 1.5;
}

.logo {
	display: block;
	margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
	header {
		display: flex;
		place-items: center;
		padding-right: calc(var(--section-gap) / 2);
	}

	.logo {
		margin: 0 2rem 0 0;
	}

	header .wrapper {
		display: flex;
		place-items: flex-start;
		flex-wrap: wrap;
	}
}
</style>
