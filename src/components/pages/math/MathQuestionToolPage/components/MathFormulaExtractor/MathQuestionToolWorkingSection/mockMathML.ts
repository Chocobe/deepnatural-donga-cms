const mockMathML = `
<div>
    <math xmlns="http://www.w3.org/1998/Math/MathML" display="inline">
        <mrow>
            <mi>f</mi>
            <mo stretchy="false">&#x00028;</mo>
            <mi>x</mi>
            <mo stretchy="false">&#x00029;</mo>
            <mo>&#x0003D;</mo>
            <mrow>
                <mo stretchy="true" fence="true" form="prefix">&#x0007B;</mo>
                <mtable>
                    <mtr>
                        <mtd columnalign="left">
                            <msup>
                                <mi>x</mi>
                                <mrow>
                                    <mn>2</mn>
                                </mrow>
                            </msup>
                        </mtd>
                        <mtd columnalign="left">
                            <mtext>&#x000A0;if&#x000A0;</mtext>
                            <mi>x</mi>
                            <mo>&#x0003C;</mo>
                            <mn>0</mn>
                        </mtd>
                    </mtr>
                    <mtr>
                        <mtd columnalign="left">
                            <mn>2</mn>
                            <mi>x</mi>
                        </mtd>
                        <mtd columnalign="left">
                            <mtext>&#x000A0;if&#x000A0;</mtext>
                            <mi>x</mi>
                            <mo>&#x02265;</mo>
                            <mn>0</mn>
                        </mtd>
                    </mtr>
                </mtable>
                <mo stretchy="true" fence="true" form="postfix" />
            </mrow>
        </mrow>
    </math>
</div>
`.trim();

export default mockMathML;
