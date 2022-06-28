if (typeof test === 'undefined') require('../test');

test('sqrt', function () {

  function t(root, value) {
    test.areEqual(root, new Big(value).sqrt().toString())
  }

  Big.DP = 20;
  Big.RM = 1;

  t('2', 4);
  t('0', 0);
  t('0', -0);
  t('0', '0');
  t('0', '-0');
  t('1', 1);
  t('1', '1');
  t('0.1', 0.01);

  test.isPositiveZero((new Big(0).sqrt()));
  test.isPositiveZero((new Big('0').sqrt()));
  test.isNegativeZero((new Big(-0).sqrt()));
  test.isNegativeZero((new Big('-0').sqrt()));

  // Test against Math.sqrt of squared integers.
  for (var i = 0; i < 1e3; i++) {
    var j = Math.floor(Math.random() * Math.pow(2, Math.floor(Math.random() * 26) + 1));
    j = Math.pow(j, 2);
    t(Math.sqrt(j).toString(), j.toString());
  }

  // Initial rounding tests.
  Big.DP = 0;

  Big.RM = 0;
  t('10', '101');
  t('10', '111');
  t('999', 999000.25);
  t('0', 0.25);

  Big.RM = 1;
  t('10', '101');
  t('11', '111');
  t('1000', 999000.25);
  t('1', 0.25);

  Big.RM = 2;
  t('10', '101');
  t('11', '111');
  t('1000', 999000.25);
  t('0', 0.25);

  t('1.850249442642802149156602e+24', '3423.423e45');

  Big.DP = 2;
  Big.RM = 0;
  t('0',    '0.0000001');

  Big.DP = 1;
  Big.RM = 1;
  t('2.6', '7');
  t('10.6', '112.439121106');
  t('1007.1', '1014216.88354115504848');
  t('14496268662.7', '210141805141682355705.090');
  t('220983929785.7', '48833897223529771949253.378778868849049559624562513592321569');
  t('1180052939140.7', '1392524939174533146207410.12619352287');
  t('120468836204612.6', '14512740496493785900839846763.82328768609126547');

  Big.DP = 10;
  t('1.0998820819', '1.20974059415009437172900');
  t('4372247436270791523.3453396636', '19116547643976509183347719022510178407.6659485696744517151189447');
  t('645.6559215353', '416871.569013637');
  t('9.3832989934', '88.0463');
  t('20195394139.0634492424', '407853944432118316238.060');
  t('203574.8431903851', '41442716779.9898655080652537763202594320363763900771333411614469322118841');
  t('434835511792648.9460364767', '189081922315974940615057855618.468666216438821105981678672603');
  t('76418328144.477890944', '5839760876397101738682.29836547353');

  Big.DP = 20;
  t('346.00153309920463414559', '119717.060907');
  t('263359760985014.62241224437474495709', '69358363706084030080212405554.3002793975414740876419285502');
  t('4.14645859760929707104', '17.193118901688058566035426');
  t('492974271191746.46231483998877250102', '243023632057033585989741137703.800100153395469328387');
  t('164.78781194238374484766', '27155.022964758430758944789724435');
  t('7366.78400597487165781255', '54269506.59068717789735301787194313247');
  t('23762326490698.34975320239967323205', '564648160250544549780100380.5514166040523');
  t('5.291502622129181181', '28');
  t('11.47156968462642430546', '131.59691102924');
  t('316358493873927157.1740897995245240711', '100082696646179606634487051294887359.5035240594546');
  t('500048686.48939798981543930512', '250048688859772239.7160140065116884182948058142834537');
  t('6022.37550162532363706717', '36269006.68257686850553015065182301017562876');
  t('6.8460154244205197188', '46.86792719140366873824501484885278');
  t('45189.48536114270306146252', '2042089587.204930656134881238462876156607');
  t('856160326.88774167756915629603', '733010505336524684.93087677');
  t('522130.17609423801622137924', '272619920788.2');
  t('52292561.72399606203863014237', '2734512011657938');

  Big.DP = 73;
  t('26887623635.3707912464629567820776000467035000476700672842803068855485151227900078069', '722944304757350004189.2345');
  t('196.9765983083095309326276839454825311907994129311587833723243476358522465777', '38799.78028111312916322430363229763959902004100996');
  t('120016703223.6151811849913819241621570830640571538995217287681670128389432142005932891', '14404009052665322623144.3467403');
  t('15.1179067962466285341140019013436699388546686629569704817549228235938583883', '228.5511059');
  t('88.8125725884151110485104354919995585100283886785637267479492612921303631122', '7887.6730497725031780');
  t('19107253881509743.3779260316306131671181869224843248420235662435238492667857670998535738552', '365087150892469154433642273521263.83276841');
  t('400.3068500117233817006410985991134968372763336206911625632292309118077689013', '160245.5741663084');

  Big.DP = 100;
  t('1.7320508075688772935274463415058723669428052538103806280558069794519330169088000370811461867572485757', 3);
  t('1.0488088481701515469914535136799375984752718576815039848757557635800059255011006914193852889331944178', 1.1);
  t('0.3162277660168379331998893544432718533719555139325216826857504852792594438639238221344248108379300295', 0.1);
  t('0.9486832980505137995996680633298155601158665417975650480572514558377783315917714664032744325137900886', 0.9);
  t('0.99999999999999999999999999999999999999994999999999999999999999999999999999999999875', '0.9999999999999999999999999999999999999999');
  t('11111.1110609999998870049994903925471271162312358157188236047401971668110785559489100264545730662845742184','123456789.00987654321');

  Big.DP = 17;
  Big.RM = 1;
  t('44.40502294864850084', '1971.80606307');

  Big.DP = 97;
  Big.RM = 0;
  t('14192376.643123461322847366137186892667087869800484670508360531721790645551341594437545247745705539930735', '201423554780276.3686384009255372');

  Big.DP = 4;
  Big.RM = 1;
  t('2553252336.0331', '6519097491458426345.3554782053764871036657698339691144086');

  Big.DP = 20;
  Big.RM = 1;
  t('62.30949119560079364913', '3882.4726930546528212066');

  Big.DP = 82;
  Big.RM = 1;
  t('174228234.709795821707519878032640346805381350977820681861118903584344693715322225768054125', '30355477770091701.53717021425249799086667828628302277998976752563');

  Big.DP = 54;
  Big.RM = 2;
  t('163256493.009563679477426538597267934928790668772138046453329418', '26652682509781714.54341292267818515442604');

  Big.DP = 57;
  Big.RM = 2;
  t('6413898755.503103237879757203310804711689478588298288050385897319721', '41138097245844256487.4');

  Big.DP = 41;
  Big.RM = 1;
  t('651.83586891179899229526795359574620017366743', '424890');

  Big.DP = 67;
  Big.RM = 0;
  t('3.1691816831920187703897673787206897581382652839389771357354751032132', '10.043712541079797228859738302727066114683041689841812835450076520');

  Big.DP = 97;
  Big.RM = 2;
  t('118594.4273063315320244062844564170472198563498805200012242127200252960812599679770627273052218882949925', '14064638188.1167541187722341530354253926613230053009933342');

  Big.DP = 5;
  Big.RM = 1;
  t('5248173.56787', '27543325798538.753780506094441280733789361778933753426582596791104');

  Big.DP = 23;
  Big.RM = 2;
  t('6.05855328019481326674235', '36.7060678489593315124567');

  Big.DP = 93;
  Big.RM = 2;
  t('164207.20075782859923311531097410558094817321169039986325465336651402772907533144002814794168144323', '26964004780.7218252942882108');

  Big.DP = 54;
  Big.RM = 2;
  t('2.723397260313830449769700482256736114679660269490922765', '7.4168926374848775741132294');

  Big.DP = 75;
  Big.RM = 2;
  t('145626737347.699863159799647089039014085200730659988131836086866937945539247414906654868', '21207146630535962175511.4592');

  Big.DP = 69;
  Big.RM = 0;
  t('15625591.477694858909123645800863577029584072458683168542082897370551849161553', '244159109027810.20442572274363387');

  Big.DP = 16;
  Big.RM = 0;
  t('85762713.1327157666976061', '7355242963884497.437336977648000579022368327415840055129120741942567239');

  Big.DP = 2;
  Big.RM = 0;
  t('74629.64', '5569583803.0907402');

  Big.DP = 62;
  Big.RM = 2;
  t('44.05501263636205450407476438041804283847324427155286698836103844', '1940.8441383900203');

  Big.DP = 24;
  Big.RM = 0;
  t('1119.912102354466031064620923', '1254203.117');

  Big.DP = 64;
  Big.RM = 0;
  t('92093628036.6480124503328403126750210810151658188780763586760022178450462311', '8481236324952480852423.718960437545027');

  Big.DP = 34;
  Big.RM = 1;
  t('1947605507655512.1474872179815308192647511525219417', '3793167213450085186132700081381');

  Big.DP = 94;
  Big.RM = 2;
  t('557716086077.5080956743653150675842959387446784555727262266063122593621607958161147001199667165261203780317', '311047232669614419511648.6130023664452767398438696');

  Big.DP = 19;
  Big.RM = 0;
  t('3.6766253682232922013', '13.517574098263058968167681315043395710343763189956497798543');

  Big.DP = 40;
  Big.RM = 1;
  t('374863740368.0156985152529892838083189109926642299794', '140522823842699082383715.919571886197001394994582');

  Big.DP = 63;
  Big.RM = 0;
  t('3039991938095044282.834999396730197828406224765246402870200714765906547758763203772', '9241550983682863551151813316288949279.9625949439074666');

  Big.DP = 29;
  Big.RM = 1;
  t('948722.35086770259132293410301310241', '900074099035.9401838348750892');

  Big.DP = 36;
  Big.RM = 0;
  t('23603002885797536.790280728725364655699852314300322649', '557101745226966849549415425061219.969394346783798760227');

  Big.DP = 18;
  Big.RM = 0;
  t('247788926631.668855265587728589', '61399352161274570866824.398764295216033428917127');

  Big.DP = 16;
  Big.RM = 0;
  t('5.8309518948453004', '34');

  Big.DP = 35;
  Big.RM = 0;
  t('756731558.25262830674557663857258007802853198', '572642651255450988.3807853');

  Big.DP = 29;
  Big.RM = 0;
  t('315.35186696767786854256245741213', '99446.8');

  Big.DP = 28;
  Big.RM = 0;
  t('21743622919.6152043904934006640996008653', '472785137670415625131.3819412384141603569725008109774351813892945');

  Big.DP = 59;
  Big.RM = 0;
  t('9931.93848832625073050157085444478223645326098496189725178399175', '98643402.13589633051811977376659116574508796');

  Big.DP = 32;
  Big.RM = 2;
  t('12491945070243173325.00123703924746770276608629177675', '156048691637972720536868554818649758614');

  Big.DP = 42;
  Big.RM = 1;
  t('1.986294948124507296707366989944167364007457', '3.94536762094493913289346223994950919328456012507449654266826');

  Big.DP = 62;
  Big.RM = 2;
  t('1854467167302463060.67001538852537388423828924920448451675904798181668319798201139', '3439048474602821519577229021879982239.2082');

  Big.DP = 51;
  Big.RM = 0;
  t('2088927.797138422758659686170900239830365738839263869523289', '4363619341657.58350562244267149496471405124');

  Big.DP = 61;
  Big.RM = 2;
  t('90061141477839967.2682846126818450599184988316687847204716382695549492605718861', '8111009204291506563499764980695382.1759246268375');

  Big.DP = 10;
  Big.RM = 2;
  t('1476747291384.9099630858', '2180782562612668171679967.63324');

  Big.DP = 84;
  Big.RM = 2;
  t('9210807993.639856342437524083401141956511342156180578284602614905116773271331676341823693120447', '84838983895699875876');

  Big.DP = 26;
  Big.RM = 2;
  t('3.37200237247840619012635848', '11.3704');

  Big.DP = 16;
  Big.RM = 1;
  t('2693874.2163861651089144', '7256958293710.1751161960');

  Big.DP = 74;
  Big.RM = 2;
  t('5732941347.55256238286493674720703619067740838113000509955135586822000095629002988639', '32866616494477789872.3518055761631860371');

  Big.DP = 4;
  Big.RM = 2;
  t('16288419988283588.674', '265312625714716342994884296792766');

  Big.DP = 37;
  Big.RM = 1;
  t('365543004.8061649872764474380277913079084143042', '133621688362719958.9872107366');

  Big.DP = 61;
  Big.RM = 1;
  t('12782418240925459479.2031797451385115697726882124289981424172567856909899486963994', '163390216085943917855551726128161143915.02664633');

  Big.DP = 43;
  Big.RM = 1;
  t('12.07324881148295353275508188921102928327377', '145.76333686397455005144032806105');

  Big.DP = 40;
  Big.RM = 1;
  t('29.6490992649274348544759045400715775766925', '879.06908722152055781935911221883768070437');

  Big.DP = 51;
  Big.RM = 2;
  t('4.666365343768356140513396346961342877525930132228624', '21.7749655215223685799362730400310696');

  Big.DP = 42;
  Big.RM = 0;
  t('17.122151356727858418696401754969183602519558', '293.168067082697642757847');

  Big.DP = 29;
  Big.RM = 2;
  t('109652272385643.1603769184581163062699906986', '12023620839335281581899617727.8772961473185586727206798164');

  Big.DP = 90;
  Big.RM = 2;
  t('13489.123629030538320414969169194877155101718802208604977345597134035561855309153297129880622467', '181956456.27927');

  Big.DP = 48;
  Big.RM = 1;
  t('2.372129844675455365912878765809140727257324413647', '5.627');

  Big.DP = 41;
  Big.RM = 0;
  t('739871537758100310.43883822919081011754036378492392360075543', '547409892384536053343836850938988791.2508666160979');

  Big.DP = 54;
  Big.RM = 0;
  t('77140.793792105688747751462443855549841986175279935245610391', '5950702066.8761715670568717062071879678486494595966218026');

  Big.DP = 93;
  Big.RM = 0;
  t('162820594803834668.752129825654424512211529624619694188452350414129430986701621110932095616631076098099130503248', '26510546092274513134180208644185957.57422670990654');

  Big.DP = 84;
  Big.RM = 0;
  t('939333.959604513485668563847772506141997730133849933463092593953521840168273751255714815246', '882348287666.2937728893202363');

  Big.DP = 9;
  Big.RM = 1;
  t('4.568369512', '20.87');

  Big.DP = 87;
  Big.RM = 1;
  t('370.818280526354041083927163168590728498008550586626184882319882834674931772525681078764889', '137506.1971725218006486309891482928119051089854653');

  Big.DP = 32;
  Big.RM = 1;
  t('459260874.20127731126343992531130965108732', '210920550572121463.814947484719373265508800614967431627085952061224891');

  Big.DP = 43;
  Big.RM = 1;
  t('34146881023818508.954756503743080316053431668549275132795068', '1166009483654816582318330803409852.007911');

  Big.DP = 26;
  Big.RM = 2;
  t('411369926586282.35173941504630680193130958', '169225216499603331644025273726.130552532747109702369176231397148094894');

  Big.DP = 42;
  Big.RM = 1;
  t('146.837594711181641908188613240193044745216301', '21561.27922056523889531529752');

  Big.DP = 80;
  Big.RM = 0;
  t('2436.80241424922206290898076140846108744470830585565672963845308477988719476570192112', '5938006.00609083724509944');

  Big.DP = 40;
  Big.RM = 0;
  t('5968940791314695.9391845388865719907476112181090409748506', '35628254170220508537420332407309.79446040');

  Big.DP = 9;
  Big.RM = 2;
  t('7757883860673599094.299765297', '60184761995699906684011270143497832606.405945309948');

  Big.DP = 43;
  Big.RM = 2;
  t('2.2181073012818834324103200205219865836926753', '4.92');

  Big.DP = 73;
  Big.RM = 1;
  t('910.9629520458008175934592151820959436914447449057963517034109551518362704397', '829853.5');

  Big.DP = 81;
  Big.RM = 2;
  t('4.242640687119285146405066172629094235709015626130844219530039213972197435386321117', '18');

  Big.DP = 12;
  Big.RM = 1;
  t('1259229966702.622212273094', '1585660109041887045436663.9');

  Big.DP = 26;
  Big.RM = 0;
  t('163.04833062468649267909332731', '26584.7581194970792');

  Big.DP = 64;
  Big.RM = 2;
  t('4204818551811.1334068235516094940662770670832347987097641633616076970760141535', '17680499053655077194352936.9862782964932');

  Big.DP = 9;
  Big.RM = 1;
  t('39405180.06334322', '1552768215824502');

  Big.DP = 2;
  Big.RM = 2;
  t('11019819.18', '121436414839837.12468');

  Big.DP = 46;
  Big.RM = 0;
  t('2.7666477911002694164386944265228742439351110337', '7.65434');

  Big.DP = 22;
  Big.RM = 1;
  t('79.8964796181302813829514', '6383.4474553703074736391804543616');

  Big.DP = 97;
  Big.RM = 1;
  t('256884.8986204117896931254014585418288760261941990857711922965396545498637125556442506103725098664222399', '65989851139.2192430115427289');

  Big.DP = 26;
  Big.RM = 1;
  t('51576.16987553369007338491641136', '2660101299.0299088953962881552848995811');

  Big.DP = 30;
  Big.RM = 1;
  t('83117929425.537107714299371091957543379566', '6908590191988567392806.80486418318444628');

  Big.DP = 41;
  Big.RM = 0;
  t('65772725.59339738278078887228018658173869609912689', '4326051431984351.09884157745017974');

  Big.DP = 98;
  Big.RM = 0;
  t('353254.68729598168174020062443678572940775163547873542847911555211434402472387360698376451692274187949171', '124788874096.581801769341529731');

  Big.DP = 24;
  Big.RM = 0;
  t('4710250560799.345071943574342121547002', '22186460345510544746149875.21079977475782182108767576173806601062569351');

  Big.DP = 58;
  Big.RM = 0;
  t('1922328.5814452710447231491355356265501994748371717620744762610836', '3695347175041.3880723243439344');

  Big.DP = 15;
  Big.RM = 1;
  t('89116010281422470.490792878028479', '7941663288478595468163012949770631.031610');

  Big.DP = 55;
  Big.RM = 1;
  t('893056745827291.2797429722245393357197289561968389609411292397482876045', '797550351267631140592697284483.78129');

  Big.DP = 91;
  Big.RM = 0;
  t('776.5090582120990070056744810742483620827196187879468568581488531077672537925651203290541573461', '602966.31748544096431040937268');

  Big.DP = 93;
  Big.RM = 0;
  t('2995751.634073306004244447026435588871407905052680216908898588671550117511803869048557530431723092132', '8974527853052.88312');

  Big.DP = 18;
  Big.RM = 1;
  t('10256041108976420629.199454567907275476', '105186379229014287888491059604397048384.620569192314');

  Big.DP = 31;
  Big.RM = 1;
  t('1668.6764282929150311920750595338744', '2784481.0223404');

  Big.DP = 67;
  Big.RM = 0;
  t('10.2385664037012525496880466372434589015640964461096948083431020419951', '104.828242003');

  Big.DP = 84;
  Big.RM = 0;
  t('68651941131739807.174750106032127662294695087292808832370099322483965602512157211426100868174677659683', '4713089021155867956380018732563084.26698833111');

  Big.DP = 21;
  Big.RM = 2;
  t('2119642072.680265413658964490823', '4492882516276291566.29881022242536487557872701343389871875');

  Big.DP = 98;
  Big.RM = 2;
  t('295414.57241487468020923791493376733960197400575508671338810222236013093392808359746725949898886883126268', '87269769595.06323634741877845138');

  Big.DP = 33;
  Big.RM = 2;
  t('37516617.579099132622513300879884121967683', '1407496594576370.06261787957718');

  Big.DP = 28;
  Big.RM = 1;
  t('1770073.1489207444615594580039659422', '3133158952530.2');

  Big.DP = 90;
  Big.RM = 1;
  t('2062559182194.651333939625538780888106868996091400331597659659567648164339407129332825200701125200486512', '4254150380055468916249334.9191129113190464726018607977');

  Big.DP = 8;
  Big.RM = 1;
  t('12.07145393', '145.72');

  Big.DP = 97;
  Big.RM = 1;
  t('25034434221195.1626546646428355078518084227214031163523557198228259498967796293623093732280578488089414910009545', '626722896775347450122233568.221736229089870371148583168');

  Big.DP = 50;
  Big.RM = 1;
  t('1369370604956.05098382437442746815592765507526977434916820834002', '1875175853717701043262789.163');

  Big.DP = 75;
  Big.RM = 1;
  t('61111046097989.562614478991002463202122550327564207016373610481385147575687339517642575745', '3734559955190605346508566151.747128467087991987800252614000906073017');

  Big.DP = 9;
  Big.RM = 2;
  t('487839154280.605258799', '237987040449216180199565.97996551897500100835854353148858639128012');

  Big.DP = 30;
  Big.RM = 0;
  t('3771198.65750627716579658341655388678', '14221939314377.1471847');

  Big.DP = 91;
  Big.RM = 0;
  t('998223.9287829203446196803384884403292209921824958032442949937536171090461827984654389784946553623', '996451011994.8088280477062132');

  Big.DP = 10;
  Big.RM = 1;
  t('5126338484054822038.6885613203', '26279346253101490909404023029363590984.22045482623574089');

  Big.DP = 37;
  Big.RM = 0;
  t('4435299142639732.0386665272768109416139138688675365733', '19671878484700742088824375591214.762823606521949640217195100557734');

  Big.DP = 29;
  Big.RM = 0;
  t('1840.27953983121746818190253230579', '3386628.78472139752');

  Big.DP = 29;
  Big.RM = 1;
  t('18505.45444317533478496724906701013', '342451844.14843774');

  Big.DP = 84;
  Big.RM = 1;
  t('15478.581565616610788736047569976878217626279567162328064930393795809558245153963295159638', '239586487.28344637');

  Big.DP = 80;
  Big.RM = 0;
  t('8.83176086632784685476404272695925396417463948093141782621020297255713993823544284', '78');

  Big.DP = 55;
  Big.RM = 0;
  t('904094739518026362.276858998253417589801385050899447007512426103468322262', '817387298024167938863983875545245626.80');

  Big.DP = 86;
  Big.RM = 0;
  t('6130.86992934880235087497305800565551205615083568452544051362005512506946811033000392166546', '37587566.09059338872940942140');

  Big.DP = 76;
  Big.RM = 1;
  t('24.7386337537059632989284591358444621508831953522417226063918014385697260780257', '612.0');

  Big.DP = 30;
  Big.RM = 0;
  t('31.610335068913719526253073315531', '999.2132831689965253909026235101062925484544085049');

  Big.DP = 37;
  Big.RM = 1;
  t('10249810.4776964144606649104434449145329654563', '105058614828695.2');

  Big.DP = 24;
  Big.RM = 0;
  t('25529284068924417.312616362288832310787818', '651744345071838052967175093720670.309523048811416290');

  Big.DP = 22;
  Big.RM = 1;
  t('468012.3980129886634423908716', '219035604693.86811504914527871748991009824119534');

  Big.DP = 6;
  Big.RM = 0;
  t('39070.768987', '1526524989.297643871802383576028102147694626812685590152575');

  Big.DP = 46;
  Big.RM = 1;
  t('1250964.0328412267817990068707571462032258488049181937', '1564911011462.3859182790021956920389318080447013349220674');

  Big.DP = 81;
  Big.RM = 1;
  t('46143126703751828496.866649027371445895940007418220059475791917987944465104919918209683758208288829164', '2129188141998495085389252895218765450927.7063857106');

  Big.DP = 60;
  Big.RM = 1;
  t('64866.977655547797763275486444509839974560207365651674817907766434', '4207724790.165337269565');

  Big.DP = 84;
  Big.RM = 2;
  t('2.94358860030385493881670889399291911046241548916385003586188315285977498131365266043', '8.664713847838807868001451403595636253922161359756547');

  Big.DP = 83;
  Big.RM = 2;
  t('424.99280768859670787492492363122383472286022111724084853084296368784059306715270358792', '180618.886587036545015612122512773593063212916813764199769387313');

  Big.DP = 51;
  Big.RM = 0;
  t('126427741490350.05876064315047378101790577982019123921425265937548', '15983973818350781697093926569.612618127837088601804542393750879971390');

  Big.DP = 36;
  Big.RM = 1;
  t('10.406728592598156155682425873215240545', '108.30');

  Big.DP = 91;
  Big.RM = 1;
  t('1183519938.0327546884078159164077132538648035819895600967199921207723839756282768130542759614616292199', '1400719443721055497.588328093817233056244752470');

  Big.DP = 32;
  Big.RM = 1;
  t('241257503.34869155337527048121955221501097', '58205182922043916.0906037558925342272671667138');

  Big.DP = 69;
  Big.RM = 2;
  t('1.486678588956157516725362331766399749551245061708835963596471115535207', '2.2102132268606715586559333071481289982224051499');

  Big.DP = 65;
  Big.RM = 0;
  t('2514912879934.47954895904718779302011160467785506374230597396840365067162301819', '6324786793660337947551689.6597215');

  Big.DP = 52;
  Big.RM = 1;
  t('2.8178317099209633246681281054844265828694464028893106', '7.94017554543610');

  Big.DP = 51;
  Big.RM = 2;
  t('81.917085580481926713094910295288886277402363899734148', '6710.40891');

  Big.DP = 32;
  Big.RM = 1;
  t('324.26623374592211771183741217403875', '105148.590347765');

  Big.DP = 43;
  Big.RM = 1;
  t('1662149798843078.4069237887302461551370934948249024202080631', '2762741953794086012243855678967.8');

  Big.DP = 89;
  Big.RM = 0;
  t('75328512486.03568083840615998761042897028410187816426562961651629515834372852207961734642188953302492', '5674384793358833469158.7800150542809744853291679751200');

  Big.DP = 81;
  Big.RM = 1;
  t('5798169.528389841210757172244446608220276215346825819225777169316424526085117502743814039', '33618769879948.4736420937');

  Big.DP = 96;
  Big.RM = 0;
  t('29119162498.850656252014862720939576335974293913751260474542935386631954376862430745731464008616766564510391', '847925624634470395269.44447102349587477');

  Big.DP = 38;
  Big.RM = 2;
  t('168.23340288442161387499486814301418324124', '28302.477846072118591243169889731912227');

  Big.DP = 13;
  Big.RM = 1;
  t('84.717176534632', '7177');

  Big.DP = 27;
  Big.RM = 0;
  t('13.385220437154074004622844494', '179.1641261512071');

  Big.DP = 23;
  Big.RM = 0;
  t('50518253294056311797.1731845046869551098465', '2552093915882431397702073747003243930704.039747494091408300134971');

  Big.DP = 52;
  Big.RM = 1;
  t('97932545.8343664485428157368834804942294639641837112693533951', '9590783533600285.2329863436120504074140917839');

  Big.DP = 58;
  Big.RM = 1;
  t('662542878881.876031608894840844837559122854993420182484052151826850145', '438963066357084252820457.6516316337481795');

  Big.DP = 75;
  Big.RM = 0;
  t('2.408258174236454324395775462046657264396664516691587445008530664989455090566', '5.7997074337767003950634583826104408675441912175');

  Big.DP = 16;
  Big.RM = 1;
  t('973.3437664448876512', '947398.08767712');

  Big.DP = 8;
  Big.RM = 1;
  t('253803.10166048', '64416014412.481521657597915615475256293');

  Big.DP = 48;
  Big.RM = 1;
  t('10979495135456507.342255564998728572391728604678115723240759397693', '120549313429513108511981910613966.523081580');

  Big.DP = 50;
  Big.RM = 1;
  t('13.1438229181471400406148696794413041749550438491914', '172.76008090361');

  Big.DP = 38;
  Big.RM = 0;
  t('140388.44002034207101031451179095355772785653', '19708914091.345183231428356292375830226197664009');

  Big.DP = 6;
  Big.RM = 2;
  t('242308.729399', '58713520342.9660909760390092854509');

  Big.DP = 21;
  Big.RM = 2;
  t('563619360203.007379904114453023253', '317666783195647379114879.695054964988341456801');

  test.isException(function () {new Big(-1).sqrt()}, "-1");
  test.isException(function () {new Big('-1').sqrt()}, "'-1'");
  test.isException(function () {new Big(-0.00000000001).sqrt()}, "-0.00000000001");
  test.isException(function () {new Big('-0.00000000001').sqrt()}, "'-0.00000000001'");
  test.isException(function () {new Big(-2.3).sqrt()}, "-2.3");
  test.isException(function () {new Big('-2.3').sqrt()}, "'-2.3'");
  test.isException(function () {new Big(-9.9e9).sqrt()}, "-9.9e9");
  test.isException(function () {new Big('-9.9e9').sqrt()}, "'-9.9e9'");

  // ROUND_UP
  Big.DP = 0;
  Big.RM = 3;
  t('11', '101');
  t('11', '111');
  t('1000', 999000.25);
  t('1', 0.25);
  t('1', 0.001);
  Big.DP = 2;
  t('0.04', 0.001);

  Big.DP = 20;
  Big.RM = 0;
  t('9.9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999e+179', new Big('1e360').minus(1));
  //t('9.999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999e+499', new Big('1e1000').minus(1));
});
