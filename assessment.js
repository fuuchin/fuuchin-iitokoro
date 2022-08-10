'use strict';
const id = id => document.getElementById(id);
const userNameInput = id('user-name');
const assessmentButton = id('assessment');
const resultDivided = id('result-area');
const tweetDivided = id('tweet-area');
const resultHeader = id('result-header');
const resultParagraph = id('result-paragraph');
const wkwk = id('wkwk');
const other = id('other-paragraph');
const scratch = id('scratch');

assessmentButton.onclick = () => {
  const userName = userNameInput.value;
  if (userName.length === 0) {
    // 名前が空の時は処理を終了する
    return;
  }

  const omikujiResults = ['大吉', '大吉', '吉', '中吉', '末吉', '末吉', '末吉', '小吉', '凶',  '凶', '凶', '凶', '大凶', '大凶'];
  let omokujiResult = null;
  const omikujiRandom = Math.floor(Math.random() * omikujiResults.length);
  omokujiResult = omikujiResults[omikujiRandom];

  const kaomoji = ['(^^)v', '(^w^)', 'Ψ(￣∀￣)Ψ', '(__)...。oo○゜', '(((((^^', 'o(*^^*)o', 'o(^▽^)o', '(´･ω･`;)', '0(｀・ω・´)=○'];
  // 全文字のコード番号を取得してそれを足し合わせる
  let sumOfCharCode = 0;
  for (let i = 0; i < userName.length; i++) {
    sumOfCharCode += userName.charCodeAt(i);
  }
  // 文字のコード番号の合計を回答の数で割って添字の数値を求める
  const index = sumOfCharCode % kaomoji.length;
  const userKaomoji = kaomoji[index];

  let result = assessment(userName);

  resultHeader.style.display = "block";
  wkwk.style.display = "none";
  resultParagraph.style.display = "block";
  resultParagraph.innerHTML = result;
  other.style.display = "block";
  other.innerHTML = `<h3>ついでに</h3>
                    <p>あなたの顔文字は...&nbsp;&nbsp;&nbsp;「<span class="omikuji-result">${userKaomoji}</span>」</p>
                    <p>おみくじの結果は...&nbsp;&nbsp;&nbsp;「<span class="omikuji-result">${omokujiResult}</span>」</p>`;
  scratch.style.display = "block";

  // ツイートエリアの作成
  tweetDivided.innerText = "";
  const anchor = document.createElement('a');
  const hrefValue =
    'https://twitter.com/intent/tweet?button_hashtag=' +
    encodeURIComponent('あなたのいいところ') +
    '&ref_src=twsrc%5Etfw';
  anchor.setAttribute('href', hrefValue);
  anchor.className = 'twitter-hashtag-button';

  // answersの中にあるツイート時には余分なHTMLタグなどを消去
  result = result.replaceAll('<br>', '');
  result = result.replaceAll('<strong>', '');
  result = result.replaceAll('</strong>さん', '');
  result = result.replace('<img src="img/utakuma.png"class="anspng">', '');
  result = result.replace('<img src="img/kirakira_woman.png"class="anspng">', '');
  result = result.replace('<img src="img/jonetsu.png"class="anspng">', '');
  result = result.replace('<img src="img/kanabou.png"class="anspng">', '');
  result = result.replace('<img src="img/chishiki.png"class="anspng">', '');
  result = result.replace('<img src="img/hengao.png"class="anspng">', '');
  result = result.replace('<img src="img/youjin.png"class="anspng">', '');
  result = result.replace('<img src="img/mitame.png"class="anspng">', '');
  result = result.replace('<img src="img/ketsudan.png"class="anspng">', '');
  result = result.replace('<img src="img/omoiyari.png"class="anspng">', '');
  result = result.replace('<img src="img/kanjusei.png"class="anspng">', '');
  result = result.replace('<img src="img/setsudo.png"class="anspng">', '');
  result = result.replace('<img src="img/koukishin.png"class="anspng">', '');
  result = result.replace('<img src="img/kikubari.png"class="anspng">', '');
  result = result.replace('<img src="img/arinomama.png"class="anspng">', '');
  result = result.replace('<img src="img/jiseishin.png"class="anspng">', '');
  result = result.replace('<img src="img/yasashii.png"class="anspng">', '');
  result = result.replace('<img src="img/doryoku.png"class="anspng">', '');

  anchor.setAttribute('data-text', result);
  anchor.innerText = 'Tweet #あなたのいいところ';
  tweetDivided.appendChild(anchor);

  // widgets.js の設定
  const script = document.createElement('script');
  script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
  tweetDivided.appendChild(script);
};

userNameInput.onkeydown = event => {
  if (event.key === 'Enter') {
    // ボタンのonclick() 処理を呼び出す
    assessmentButton.onclick();
  }
};

const answers = [
  '<strong>{userName}</strong>さんのいいところは声です。<br><strong>{userName}</strong>さんの特徴的な声は皆を惹きつけ、心に残ります。<br><img src="img/utakuma.png"class="anspng">',
  '<strong>{userName}</strong>さんのいいところはまなざしです。<br><strong>{userName}</strong>さんに見つめられた人は、気になって仕方がないでしょう。<br><img src="img/kirakira_woman.png"class="anspng">',
  '<strong>{userName}</strong>さんのいいところは情熱です。<br><strong>{userName}</strong>さんの情熱に周りの人は感化されます。<br><img src="img/jonetsu.png"class="anspng">',
  '<strong>{userName}</strong>さんのいいところは厳しさです。<br><strong>{userName}</strong>さんの厳しさがものごとをいつも成功に導きます。<br><img src="img/kanabou.png"class="anspng">',
  '<strong>{userName}</strong>さんのいいところは知識です。<br>博識な<strong>{userName}</strong>さんを多くの人が頼りにしています。<br><img src="img/chishiki.png"class="anspng">',
  '<strong>{userName}</strong>さんのいいところはユニークさです。<br><strong>{userName}</strong>さんだけのその特徴が皆を楽しくさせます。<br><img src="img/hengao.png"class="anspng">',
  '<strong>{userName}</strong>さんのいいところは用心深さです。<br><strong>{userName}</strong>さんの洞察に、多くの人が助けられます。<br><img src="img/youjin.png"class="anspng">',
  '<strong>{userName}</strong>さんのいいところは見た目です。<br>内側から溢れ出る<strong>{userName}</strong>さんの良さに皆が気を惹かれます。<br><img src="img/mitame.png"class="anspng">',
  '<strong>{userName}</strong>さんのいいところは決断力です。<br><strong>{userName}</strong>さんがする決断にいつも助けられる人がいます。<br><img src="img/ketsudan.png"class="anspng">',
  '<strong>{userName}</strong>さんのいいところは思いやりです。<br><strong>{userName}</strong>さんに気をかけてもらった多くの人が感謝しています。<br><img src="img/omoiyari.png"class="anspng">',
  '<strong>{userName}</strong>さんのいいところは感受性です。<br><strong>{userName}</strong>さんが感じたことに皆が共感し、わかりあうことができます。<br><img src="img/kanjusei.png"class="anspng">',
  '<strong>{userName}</strong>さんのいいところは節度です。<br>強引すぎない<strong>{userName}</strong>さんの考えに皆が感謝しています。<br><img src="img/setsudo.png"class="anspng">',
  '<strong>{userName}</strong>さんのいいところは好奇心です。<br>新しいことに向かっていく<strong>{userName}</strong>さんの心構えが多くの人に魅力的に映ります。<br><img src="img/koukishin.png"class="anspng">',
  '<strong>{userName}</strong>さんのいいところは気配りです。<br><strong>{userName}</strong>さんの配慮が多くの人を救っています。<br><img src="img/kikubari.png"class="anspng">',
  '<strong>{userName}</strong>さんのいいところはその全てです。<br>ありのままの<strong>{userName}</strong>さん自身がいいところなのです。<br><img src="img/arinomama.png"class="anspng">',
  '<strong>{userName}</strong>さんのいいところは自制心です。<br>やばいと思ったときにしっかりと衝動を抑えられる<strong>{userName}</strong>さんが皆から評価されています。<br><img src="img/jiseishin.png"class="anspng">',
  '<strong>{userName}</strong>さんのいいところは優しさです。<br><strong>{userName}</strong>さんの優しい雰囲気や立ち振る舞いに多くの人が癒やされています。<br><img src="img/yasashii.png"class="anspng">',
  '<strong>{userName}</strong>さんのいいところは努力できることです。<br><strong>{userName}</strong>さんの一生懸命努力する姿を皆が見習おうとしています。<br><img src="img/doryoku.png"class="anspng">'
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */
function assessment(userName) {
  // 全文字のコード番号を取得してそれを足し合わせる
  let sumOfCharCode = 0;
  for (let i = 0; i < userName.length; i++) {
    sumOfCharCode += userName.charCodeAt(i);
  }

  // 文字のコード番号の合計を回答の数で割って添字の数値を求める
  const index = sumOfCharCode % answers.length;
  let result = answers[index];

  result = result.replaceAll('{userName}', userName);
  return result;
}
