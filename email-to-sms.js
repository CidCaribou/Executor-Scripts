javascript:var%20message%3Dwindow.getSelection().toString()%3Bvar%20someLocation%3Dwindow.location.href%2CmsgLength%3Dmessage.length%2ClocLength%3DsomeLocation.length%2CtotalMsg%3DlocLength%2BmsgLength%2ChowMany%3DtotalMsg%2F160%3BhowMany%3DparseFloat(howMany)%3BhowMany%3DMath.ceil(howMany)%3Bdocument.getElementsByTagName(%22body%22)%5B0%5D.setAttribute(%22onMouseUp%22%2C%22changeSel()%3B%22)%3B%0Afunction%20changeSel()%7Bmessage%3Dwindow.getSelection().toString()%3Bif(1%3Cmessage.length)%7Bdocument.getElementById(%22hiddenSelect%22).innerHTML%3Dmessage%3BhowMany%3Dmessage.length%2F160%3BhowMany%3DparseFloat(howMany)%3BhowMany%3DMath.ceil(howMany)%3BhowManyURL%3D(message.length%2BlocLength)%2F160%3BhowManyURL%3DparseFloat(howManyURL)%3BhowManyURL%3DMath.ceil(howManyURL)%3Bvar%20a%3Dmessage.length%2BlocLength%3Bdocument.getElementById(%22totsize%22).innerHTML%3D%22New%20message%20is%20%22%2Ba%2B%22%20chars.%20sent%20in%20%22%2BhowMany%2B%22SMS%20messages.%22%3B918%3Cmessage.length%26%26alert(%22Your%20message%20exceeds%20918%20characters!%5CnPlease%20shorten%20it.%22)%7D%7D%0Aif(document.getElementById(%22mymenu%22))document.getElementById(%22mymenu%22).remove()%3Belse%7Bvar%20showURL%3Dfunction()%7Bvar%20a%3Ddocument.getElementById(%22urlCheck%22)%2Cb%3Ddocument.getElementById(%22hider%22)%3B1%3D%3Da.checked%3F(b.style.display%3D%22block%22%2Cdocument.getElementById(%22totsize%22).innerHTML%3Dmessage.length%2BsomeLocation.length%2B%22%20chars.%20-%20Sent%20in%20%22%2BhowManyURL%2B%22%20SMS%20message(s)%22)%3A(b.style.display%3D%22none%22%2Cdocument.getElementById(%22totsize%22).innerHTML%3Dmessage.length%2B%22%20chars.%20-%20Sent%20in%20%22%2BhowMany%2B%22%20SMS%20message(s)%22)%7D%2CsendIt%3Dfunction()%7Bconsole.log(%22Here%22)%3B%0Avar%20a%3D%22%22%2Cb%3Dmessage%2Cd%3Ddocument%2Ce%3Dwindow%3Bb%3Ddocument.getElementById(%22hiddenSelect%22).innerHTML%3Bvar%20c%3Ddocument.getElementById(%22numero%22).value%3Bc%3Dc.split(%22-%22).join(%22%22)%3Bc%3Dc.split(%22%20%22).join(%22%22)%3Bc%3Dc.replace(%2F%5B()%5D%2Fg%2C%22%22)%3BtheLocation%3D1%3D%3DurlCheck.checked%3FencodeURIComponent(d.location)%3A%22%22%3Ba%3De.open(%22http%3A%2F%2Fmail.google.com%2Fmail%2Fs%3Fview%3Dcm%26fs%3D1%26tf%3D1%26to%3D%22%2Bc%2B%22%40%22%2BgetOperator()%2B%22%26su%3D%22%2BencodeURIComponent(d.title)%2B%22%26body%3D%22%2BencodeURIComponent(b)%2Bescape(%22%5Cn%5Cn%22)%2BtheLocation%2B%22%26zx%3DRANDOMCRAP%26shva%3D1%26disablechatbrowsercheck%3D1%26ui%3D1%22%2C%0A%22gmailForm%22%2C%22scrollbars%3Dyes%2Cwidth%3D680%2Cheight%3D575%2Ctop%3D175%2Cleft%3D75%2Cstatus%3Dno%2Cresizable%3Dyes%22)%3Bd.all%7C%7CsetTimeout(function()%7Ba.focus()%7D%2C50)%7D%2CgetOperator%3Dfunction()%7Bfor(var%20a%3D0%2Cb%3Dops.length%3Ba%3Cb%3Ba%2B%2B)if(ops%5Ba%5D.checked)return%20ops%5Ba%5D.value%7D%2CremMen%3Dfunction()%7Bdocument.getElementById(%22mymenu%22).remove()%7D%2Cops%3Ddocument.getElementsByName(%22operator%22)%2CbottomMsg%3D%22Your%20original%20message%20is%20%22%2BmsgLength%2B%22%20characters%20long%3B%20The%20URL%20is%20%22%2BlocLength%2B%22%20characters%20long.%3Cbr%20%2F%3ETotal%20Message%20Size%3A%20%22%3B918%3CtotalMsg%26%26alert(%22Your%20message%20exceeds%20918%20characters!%5CnPlease%20shorten%20it.%22)%3B%0Avar%20block_to_insert%3Ddocument.createElement(%22div%22)%3Bblock_to_insert.id%3D%22mymenu%22%3Bblock_to_insert.innerHTML%3D%22%3Cdiv%20style%3Dfloat%3Aright%3E%3Ca%20href%3D%23%20onClick%3DremMen()%20style%3Dcolor%3Ared%3Bsize%3A400%25%3Btext-decoration%3Anone%3B%20title%3DCancel%3E%26times%3B%3C%2Fa%3E%3Cbr%3E%3Ctextarea%20id%3DhiddenSelect%20style%3Ddisplay%3Anone%3B%20maxlength%3D918%3E%22%2Bmessage%2B%22%3C%2Ftextarea%3E%3C%2Fdiv%3E%3Cbr%3E%3Ctable%3E%3Ctr%3E%3Ctd%20width%3D25%25%20%3E%3Ch3%3E%26%23128241%3B%20Send%20Text%20to%20Mobile%20Phone.%20%26nbsp%3B%26nbsp%3B%3C%2Fh3%3E%3Cbr%20%2F%3E%3Cform%20id%3Dmessager%20name%3Dmessager%3E%3Cinput%20type%3Dtext%20size%3D37%20id%3Dnumero%20name%3Dnumero%20placeholder%3DEnter%26nbsp%3Bmobile%26nbsp%3Bnumber%26nbsp%3Bhere%20maxlength%3D14%20required%20%2F%3E%3Cbr%20%2F%3E%3Csup%20style%3Dcolor%3Agray%3Bsize%3A70%25%3E%3Ci%3EYour%20highlighted%20text%20will%20be%20sent%20via%20Gmail.%3C%2Fi%3E%3C%2Fsup%3E%3Cbr%2F%3E%3Clabel%3E%3Cinput%20type%3Dcheckbox%20checked%20id%3DurlCheck%20onClick%3DshowURL()%3E%20%3Cfont%20size%3D-2%3EInclude%20URL%3A%20%3Cspan%20id%3Dhider%20style%3Dcolor%3A%2300F%3E%22%2B%0AsomeLocation%2B%22%3C%2Fspan%3E%3C%2Ffont%3E%3Cbr%20%2F%3E%3C%2Ffont%3E%3C%2Flabel%3E%3Cbr%20%2F%3E%3Cinput%20type%3Dbutton%20name%3Dsend%20value%3Dsend%20onClick%3D%27sendIt()%27%2F%3E%3C%2Ftd%3E%3Ctd%20width%3D25%25%3E%3Cb%3EPlease%20choose%20an%20operator%3A%3C%2Fb%3E%3Cbr%20%2F%3E%3Clabel%3E%3Cinput%20type%3Dradio%20name%3Doperator%20value%3Dtxt.att.net%20required%3E%20AT%26T%3C%2Flabel%3E%3Cbr%20%2F%3E%3Clabel%3E%3Cinput%20type%3Dradio%20name%3Doperator%20value%3Dtmomail.net%3E%20T-Mobile%3C%2Flabel%3E%3Cbr%20%2F%3E%3Clabel%3E%3Cinput%20type%3Dradio%20name%3Doperator%20value%3Dmessaging.sprintpcs.com%3E%20Sprint%20PCS%3C%2Flabel%3E%3Cbr%20%2F%3E%3Clabel%3E%3Cinput%20type%3Dradio%20name%3Doperator%20value%3Dvtext.com%3E%20Verizon%3C%2Flabel%3E%3Cbr%20%2F%3E%3Clabel%3E%3Cinput%20type%3Dradio%20name%3Doperator%20value%3Dsms.cricketwireless.net%3E%20Cricket%3C%2Flabel%3E%3Cbr%20%2F%3E%3Clabel%3E%3Cinput%20type%3Dradio%20name%3Doperator%20value%3Demail.uscc.net%3E%20US%20Cellular%3C%2Flabel%3E%3Cbr%20%2F%3E%3Clabel%3E%3Cinput%20type%3Dradio%20name%3Doperator%20value%3Dvmobl.com%3E%20Virgin%20Mobile%3C%2Flabel%3E%3Cbr%20%2F%3E%3Clabel%3E%3Cinput%20type%3Dradio%20name%3Doperator%20value%3Dsmsmyboostmobile.com%3E%20Boost%3C%2Flabel%3E%3Cbr%20%2F%3E%3Cinput%20type%3Dhidden%20name%3Doperator%20value%3DYOU%20MUST%20CHOOSE%20AN%20OPERATOR!%20checked%3Dchecked%2F%3E%3C%2Ftd%3E%3C%2Ftr%3E%3C%2Fform%3E%3C%2Ftable%3E%3Cbr%3E%3Cfont%20size%3D-2%20color%3D%23FF0000%3E%3Ci%3E%22%2B%0AbottomMsg%2B%22%3C%2Fi%3E%3C%2Ffont%3E%3Cfont%20size%3D-2%20color%3D%23405d27%3E%3Cb%3E%3Cspan%20id%3Dtotsize%3E%22%2BtotalMsg%2B%22%20chars.%20-%20Sent%20in%20%22%2BhowMany%2B%22%20SMS%20message(s)%3C%2Fspan%3E%3C%2Fb%3C%2Ffont%3E%3Cdiv%20style%3Dfloat%3Aright%3E%3Ca%20href%3Dhttps%3A%2F%2Frealphonevalidation.com%2Fresources%2Fphone-carrier-lookup%2F%23gf_44%20target%3D_blank%20style%3Dcolor%3Ablue%3Bsize%3A400%25%3Btext-decoration%3Anone%3B%20title%3DLook%26nbsp%3Bup%26nbsp%3BCarrier%3ELookUp%20Carrier%20%26%239432%3B%3C%2Fa%3E%3C%2Fdiv%3E%22%3Bvar%20container_block%3Ddocument.getElementsByTagName(%22body%22)%5B0%5D%3Bcontainer_block.appendChild(block_to_insert)%3Bmymenu.setAttribute(%22style%22%2C%0A%22margin-left%3Aauto%3Bmargin-right%3Aauto%3Bwidth%3A50%25%3Bbackground-color%3A%23FFFF00%3Bborder-style%3Aoutset%3Bcolor%3Ablack%3Bfloat%3Aleft%3Bfont-family%3Aarial%2Csans%2Cverdana%3Bfont-size%3A1rem!important%3Bfont-size%3A100%25!important%3Bz-index%3A10000%3Bdisplay%3Ainline-block%3Bline-height%3A1!important%3Boverflow%3Avisible%3Bposition%3Afixed%3Btop%3A0%3Bpadding%3A2px%205px%3B%22)%7D%3B