import reactElementToJSXString from 'react-element-to-jsx-string'

export const gwpOptions = [
  {
    label: 'General',
    options: [
      {
        value: 'co2',
        label: (
          <>
            CO<sub>2</sub>
          </>
        ),
      },
      {
        value: 'ch4',
        label: (
          <>
            CH<sub>4</sub>
          </>
        ),
      },
      {
        value: 'n2o',
        label: (
          <>
            N<sub>2</sub>O
          </>
        ),
      },
    ],
  },
  {
    label: 'Montreal Protocol',
    options: [
      {
        value: 'ccl3f',
        label: (
          <>
            CCl<sub>3</sub>F
          </>
        ),
      },
      {
        value: 'ccl2f2',
        label: (
          <>
            CCl<sub>2</sub>F<sub>2</sub>
          </>
        ),
      },
      {
        value: 'cclf3',
        label: (
          <>
            CClF<sub>3</sub>O
          </>
        ),
      },
      {
        value: 'ccl2fcclf2',
        label: (
          <>
            CCl<sub>2</sub>FCClF<sub>2</sub>
          </>
        ),
      },
      {
        value: 'cclf2cclf2',
        label: (
          <>
            CClF<sub>2</sub>CClF<sub>2</sub>
          </>
        ),
      },
      {
        value: 'cclf2cf3',
        label: (
          <>
            CClF<sub>2</sub>CF<sub>3</sub>
          </>
        ),
      },
      {
        value: 'cbrf3',
        label: (
          <>
            CBrF<sub>3</sub>
          </>
        ),
      },
      {
        value: 'cbrclf2',
        label: (
          <>
            CBrClF<sub>2</sub>
          </>
        ),
      },
      {
        value: 'cbrf2cbrf2',
        label: (
          <>
            CBrF<sub>2</sub>CBrF<sub>2</sub>
          </>
        ),
      },
      {
        value: 'ccl4',
        label: (
          <>
            CCl<sub>4</sub>
          </>
        ),
      },
      {
        value: 'ch3br',
        label: (
          <>
            CH<sub>3</sub>Br
          </>
        ),
      },
      {
        value: 'ch3ccl3',
        label: (
          <>
            CH<sub>3</sub>CCl<sub>3</sub>
          </>
        ),
      },

      {
        value: 'chcl2f',
        label: (
          <>
            CHCl<sub>2</sub>F
          </>
        ),
      },
      {
        value: 'chclf2',
        label: (
          <>
            CHCLF<sub>2</sub>
          </>
        ),
      },
      {
        value: 'chcl2cf3',
        label: (
          <>
            CHCl<sub>2</sub>CF<sub>3</sub>
          </>
        ),
      },
      {
        value: 'chclfcf3',
        label: (
          <>
            CHClFCF<sub>3</sub>
          </>
        ),
      },
      {
        value: 'ch3ccl2f',
        label: (
          <>
            CH<sub>3</sub>CCl<sub>2</sub>F
          </>
        ),
      },
      {
        value: 'ch3cclf2',
        label: (
          <>
            CH<sub>3</sub>CClF<sub>2</sub>
          </>
        ),
      },
      {
        value: 'chcl2cf2cf3',
        label: (
          <>
            CHCl<sub>2</sub>CF<sub>2</sub>CF<sub>3</sub>
          </>
        ),
      },
      {
        value: 'chclfcf2cclf2',
        label: (
          <>
            CHClFCF<sub>2</sub>CClF<sub>2</sub>
          </>
        ),
      },
    ],
  },
  {
    label: 'Hydrofluorocarbons (HFCs)',
    options: [
      {
        value: 'chf3',
        label: (
          <>
            CHF<sub>3</sub>
          </>
        ),
      },
      {
        value: 'ch2f2',
        label: (
          <>
            CH<sub>2</sub>F<sub>2</sub>
          </>
        ),
      },
      {
        value: 'ch3f2',
        label: (
          <>
            CH<sub>3</sub>F<sub>2</sub>
          </>
        ),
      },
      {
        value: 'chf2cf3',
        label: (
          <>
            CHF<sub>2</sub>CF<sub>3</sub>
          </>
        ),
      },
      {
        value: 'chf2chf2',
        label: (
          <>
            CHF<sub>2</sub>CHF<sub>2</sub>
          </>
        ),
      },
      {
        value: 'ch2fcf3',
        label: (
          <>
            CH<sub>2</sub>FCF<sub>3</sub>
          </>
        ),
      },
      {
        value: 'ch2fchf2',
        label: (
          <>
            CH<sub>2</sub>FCHF<sub>2</sub>
          </>
        ),
      },
      {
        value: 'ch3cf3',
        label: (
          <>
            CH<sub>3</sub>CF<sub>3</sub>
          </>
        ),
      },
      {
        value: 'ch2fch2f',
        label: (
          <>
            CH<sub>2</sub>FCH<sub>2</sub>F
          </>
        ),
      },
      {
        value: 'ch3chf2',
        label: (
          <>
            CH<sub>3</sub>CHF<sub>2</sub>
          </>
        ),
      },
      {
        value: 'ch3ch2f',
        label: (
          <>
            CH<sub>3</sub>CH<sub>2</sub>F
          </>
        ),
      },
      {
        value: 'cf3chfcf3',
        label: (
          <>
            CF<sub>3</sub>CHFCF<sub>3</sub>
          </>
        ),
      },
      {
        value: 'ch2fcf2cf3',
        label: (
          <>
            CH<sub>2</sub>FCF<sub>2</sub>CF<sub>3</sub>
          </>
        ),
      },
      {
        value: 'chf2chfcf3',
        label: (
          <>
            CHF<sub>2</sub>CHFCF<sub>3</sub>
          </>
        ),
      },
      {
        value: 'cf3ch2cf3',
        label: (
          <>
            CF<sub>3</sub>CH<sub>2</sub>CF<sub>3</sub>
          </>
        ),
      },
      {
        value: 'ch2fcf2chf2',
        label: (
          <>
            CH<sub>2</sub>FCF<sub>2</sub>CHF<sub>2</sub>
          </>
        ),
      },
      {
        value: 'chf2ch2cf3',
        label: (
          <>
            CHF<sub>2</sub>CH<sub>2</sub>CF<sub>3</sub>
          </>
        ),
      },
      {
        value: 'ch3cf2ch2cf3',
        label: (
          <>
            CH<sub>3</sub>CF<sub>2</sub>CH<sub>2</sub>CF<sub>3</sub>
          </>
        ),
      },
      {
        value: 'cf3chfchfcf2cf3',
        label: (
          <>
            CF<sub>3</sub>CHFCHFCF<sub>2</sub>CF<sub>3</sub>
          </>
        ),
      },
    ],
  },
  {
    label: 'Perfluorinated compounds',
    options: [
      {
        value: 'sf6',
        label: (
          <>
            SF<sub>6</sub>
          </>
        ),
      },
      {
        value: 'nf3',
        label: (
          <>
            NF<sub>3</sub>
          </>
        ),
      },
      {
        value: 'cf4',
        label: (
          <>
            CF<sub>4</sub>
          </>
        ),
      },
      {
        value: 'c2f6',
        label: (
          <>
            C<sub>2</sub>F<sub>6</sub>
          </>
        ),
      },
      {
        value: 'c3f8',
        label: (
          <>
            C<sub>3</sub>F<sub>8</sub>
          </>
        ),
      },
      {
        value: 'c-c4f8',
        label: (
          <>
            c-C<sub>4</sub>F<sub>8</sub>
          </>
        ),
      },
      {
        value: 'c4f10',
        label: (
          <>
            C<sub>4</sub>F<sub>10</sub>
          </>
        ),
      },
      {
        value: 'c5f12',
        label: (
          <>
            C<sub>5</sub>F<sub>12</sub>
          </>
        ),
      },
      {
        value: 'c6f14',
        label: (
          <>
            C<sub>6</sub>F<sub>14</sub>
          </>
        ),
      },
      {
        value: 'c10f18',
        label: (
          <>
            C<sub>10</sub>F<sub>18</sub>
          </>
        ),
      },
      {
        value: 'sf5cf3',
        label: (
          <>
            SF<sub>5</sub>CF<sub>3</sub>
          </>
        ),
      },
      {
        value: 'c-c3f6',
        label: (
          <>
            c-C<sub>3</sub>F<sub>6</sub>
          </>
        ),
      },
    ],
  },
  {
    label: 'Fluorinated ethers',
    options: [
      {
        value: 'chf2ocf3',
        label: (
          <>
            CHF<sub>2</sub>OCF<sub>3</sub>
          </>
        ),
      },
      {
        value: 'chf2ochf2',
        label: (
          <>
            CHF<sub>2</sub>OCHF<sub>2</sub>
          </>
        ),
      },
      {
        value: 'ch3ocf3',
        label: (
          <>
            CH<sub>3</sub>OCF<sub>3</sub>
          </>
        ),
      },
      {
        value: 'chf2ochclcf3',
        label: (
          <>
            CHF<sub>2</sub>OCHClCF<sub>3</sub>
          </>
        ),
      },
      {
        value: 'ch3ocf2cf3',
        label: (
          <>
            CH<sub>3</sub>OCF<sub>2</sub>CF<sub>3</sub>
          </>
        ),
      },
      {
        value: 'chf2och2cf3',
        label: (
          <>
            CHF<sub>2</sub>OCH<sub>2</sub>CF<sub>3</sub>
          </>
        ),
      },
      {
        value: 'ch3ocf2cf2cf3',
        label: (
          <>
            CH<sub>3</sub>OCF<sub>2</sub>CF<sub>2</sub>CF<sub>3</sub>
          </>
        ),
      },
      {
        value: 'chf2cf2och2cf3',
        label: (
          <>
            CHF<sub>2</sub>CF<sub>2</sub>OCH<sub>2</sub>CF<sub>3</sub>
          </>
        ),
      },
      {
        value: 'ch3ocf2cf2chf2',
        label: (
          <>
            CH<sub>3</sub>OCF<sub>2</sub>CF<sub>2</sub>CHF<sub>2</sub>
          </>
        ),
      },
      {
        value: 'c4f9och3',
        label: (
          <>
            C<sub>4</sub>F<sub>9</sub>OCH<sub>3</sub>
          </>
        ),
      },
      {
        value: 'c4f9oc2h5',
        label: (
          <>
            C<sub>4</sub>F<sub>9</sub>OC<sub>2</sub>H<sub>5</sub>
          </>
        ),
      },
      {
        value: 'chf2ocf2oc2f4ochf2',
        label: (
          <>
            CHF<sub>2</sub>OCF<sub>2</sub>OC<sub>2</sub>F<sub>4</sub>OCHF
            <sub>2</sub>
          </>
        ),
      },
      {
        value: 'chf2ocf2ochf2',
        label: (
          <>
            CHF<sub>2</sub>OCF<sub>2</sub>OCHF<sub>2</sub>
          </>
        ),
      },

      {
        value: 'chf2ocf2cf2ochf2',
        label: (
          <>
            CHF<sub>2</sub>OCF<sub>2</sub>CF<sub>2</sub>OCHF<sub>2</sub>
          </>
        ),
      },
      {
        value: 'cf3chfocf3',
        label: (
          <>
            CF<sub>3</sub>CHFOCF<sub>3</sub>
          </>
        ),
      },
      {
        value: 'chf2ochfcf3',
        label: (
          <>
            CHF<sub>2</sub>OCHFCF<sub>3</sub>
          </>
        ),
      },
      {
        value: 'cf3ch2ocf3',
        label: (
          <>
            CF<sub>3</sub>CH<sub>2</sub>OCF<sub>3</sub>
          </>
        ),
      },
      {
        value: 'chf2ch2ocf3',
        label: (
          <>
            CHF<sub>2</sub>CH<sub>2</sub>OCF<sub>3</sub>
          </>
        ),
      },
      {
        value: 'cf3ch2och3',
        label: (
          <>
            CF<sub>3</sub>CH<sub>2</sub>OCH<sub>3</sub>
          </>
        ),
      },
      {
        value: 'chf2cf2ocf2cf3',
        label: (
          <>
            CHF<sub>2</sub>CF<sub>2</sub>OCF<sub>2</sub>CF<sub>3</sub>
          </>
        ),
      },
      {
        value: 'cf3ch2ocf2cf3',
        label: (
          <>
            CF<sub>3</sub>CH<sub>2</sub>OCF<sub>2</sub>CF<sub>3</sub>
          </>
        ),
      },
      {
        value: 'chf2ch2ocf2cf3',
        label: (
          <>
            CHF<sub>2</sub>CH<sub>2</sub>OCF<sub>2</sub>CF<sub>3</sub>
          </>
        ),
      },
      {
        value: 'ch3ocf2chfcf3',
        label: (
          <>
            CH<sub>3</sub>OCF<sub>2</sub>CHFCF<sub>3</sub>
          </>
        ),
      },
      {
        value: 'chf2ch2ocf2chf2',
        label: (
          <>
            CHF<sub>2</sub>CH<sub>2</sub>OCF<sub>2</sub>CHF<sub>2</sub>
          </>
        ),
      },
      {
        value: 'chf2och2cf2chf2',
        label: (
          <>
            CHF<sub>2</sub>OCH<sub>2</sub>CF<sub>2</sub>CHF<sub>2</sub>
          </>
        ),
      },
      {
        value: 'cf3cf2ch2och3',
        label: (
          <>
            CF<sub>3</sub>CF<sub>2</sub>CH<sub>2</sub>OCH<sub>3</sub>
          </>
        ),
      },
      {
        value: 'chf2cf2och2ch3',
        label: (
          <>
            CHF<sub>2</sub>CF<sub>2</sub>OCH<sub>2</sub>CH<sub>3</sub>
          </>
        ),
      },
    ],
  },
  {
    label: 'Perfluoropolyethers',
    options: [
      {
        value: 'cf3ocf(cf3)cf2ocf2ocf3',
        label: (
          <>
            CF<sub>3</sub>OCF(CF<sub>3</sub>)CF<sub>2</sub>OCF<sub>2</sub>OCF
            <sub>3</sub>
          </>
        ),
      },
    ],
  },
  {
    label: 'Others',
    options: [
      {
        value: 'chcl3',
        label: (
          <>
            CHCl<sub>3</sub>
          </>
        ),
      },
      {
        value: 'ch2cl2',
        label: (
          <>
            CH<sub>2</sub>Cl<sub>2</sub>
          </>
        ),
      },
      {
        value: 'ch3cl',
        label: (
          <>
            CH<sub>3</sub>Cl
          </>
        ),
      },
      {
        value: 'chbrf2',
        label: (
          <>
            CHBrF<sub>2</sub>
          </>
        ),
      },
    ],
  },
]

export const gwpMapping = [
  {
    value: 'co2',
    label: (
      <>
        CO<sub>2</sub>
      </>
    ),
    ar5: 1,
  },
  {
    value: 'ch4',
    label: (
      <>
        CH<sub>4</sub>
      </>
    ),
    ar5: 28,
  },
  {
    value: 'n2o',
    label: (
      <>
        N<sub>2</sub>O
      </>
    ),
    ar5: 265,
  },
  // Substances controlled by the Montreal Protocol
  {
    value: 'ccl3f',
    label: (
      <>
        CCl<sub>3</sub>F
      </>
    ),
    ar5: 4660,
  },
  {
    value: 'ccl2f2',
    label: (
      <>
        CCl<sub>2</sub>F<sub>2</sub>
      </>
    ),
    ar5: 10200,
  },
  {
    value: 'cclf3',
    label: (
      <>
        CClF<sub>3</sub>O
      </>
    ),
    ar5: 13900,
  },
  {
    value: 'ccl2fcclf2',
    label: (
      <>
        CCl<sub>2</sub>FCClF<sub>2</sub>
      </>
    ),
    ar5: 5820,
  },
  {
    value: 'cclf2cclf2',
    label: (
      <>
        CClF<sub>2</sub>CClF<sub>2</sub>
      </>
    ),
    ar5: 8590,
  },
  {
    value: 'cclf2cf3',
    label: (
      <>
        CClF<sub>2</sub>CF<sub>3</sub>
      </>
    ),
    ar5: 7670,
  },
  {
    value: 'cbrf3',
    label: (
      <>
        CBrF<sub>3</sub>
      </>
    ),
    ar5: 6290,
  },
  {
    value: 'cbrclf2',
    label: (
      <>
        CBrClF<sub>2</sub>
      </>
    ),
    ar5: 1750,
  },
  {
    value: 'cbrf2cbrf2',
    label: (
      <>
        CBrF<sub>2</sub>CBrF<sub>2</sub>
      </>
    ),
    ar5: 1470,
  },
  {
    value: 'ccl4',
    label: (
      <>
        CCl<sub>4</sub>
      </>
    ),
    ar5: 1730,
  },
  {
    value: 'ch3br',
    label: (
      <>
        CH<sub>3</sub>Br
      </>
    ),
    ar5: 2,
  },
  {
    value: 'ch3ccl3',
    label: (
      <>
        CH<sub>3</sub>CCl<sub>3</sub>
      </>
    ),
    ar5: 160,
  },

  {
    value: 'chcl2f',
    label: (
      <>
        CHCl<sub>2</sub>F
      </>
    ),
    ar5: 148,
  },
  {
    value: 'chclf2',
    label: (
      <>
        CHCLF<sub>2</sub>
      </>
    ),
    ar5: 1760,
  },
  {
    value: 'chcl2cf3',
    label: (
      <>
        CHCl<sub>2</sub>CF<sub>3</sub>
      </>
    ),
    ar5: 79,
  },
  {
    value: 'chclfcf3',
    label: (
      <>
        CHClFCF<sub>3</sub>
      </>
    ),
    ar5: 527,
  },
  {
    value: 'ch3ccl2f',
    label: (
      <>
        CH<sub>3</sub>CCl<sub>2</sub>F
      </>
    ),
    ar5: 782,
  },
  {
    value: 'ch3cclf2',
    label: (
      <>
        CH<sub>3</sub>CClF<sub>2</sub>
      </>
    ),
    ar5: 1980,
  },
  {
    value: 'chcl2cf2cf3',
    label: (
      <>
        CHCl<sub>2</sub>CF<sub>2</sub>CF<sub>3</sub>
      </>
    ),
    ar5: 127,
  },
  {
    value: 'chclfcf2cclf2',
    label: (
      <>
        CHClFCF<sub>2</sub>CClF<sub>2</sub>
      </>
    ),
    ar5: 525,
  },
  // Hydrofluorocarbons (HFCs)
  {
    value: 'chf3',
    label: (
      <>
        CHF<sub>3</sub>
      </>
    ),
    ar5: 12400,
  },
  {
    value: 'ch2f2',
    label: (
      <>
        CH<sub>2</sub>F<sub>2</sub>
      </>
    ),
    ar5: 677,
  },
  {
    value: 'ch3f2',
    label: (
      <>
        CH<sub>3</sub>F<sub>2</sub>
      </>
    ),
    ar5: 116,
  },
  {
    value: 'chf2cf3',
    label: (
      <>
        CHF<sub>2</sub>CF<sub>3</sub>
      </>
    ),
    ar5: 3170,
  },
  {
    value: 'chf2chf2',
    label: (
      <>
        CHF<sub>2</sub>CHF<sub>2</sub>
      </>
    ),
    ar5: 1120,
  },
  {
    value: 'ch2fcf3',
    label: (
      <>
        CH<sub>2</sub>FCF<sub>3</sub>
      </>
    ),
    ar5: 1300,
  },
  {
    value: 'ch2fchf2',
    label: (
      <>
        CH<sub>2</sub>FCHF<sub>2</sub>
      </>
    ),
    ar5: 328,
  },
  {
    value: 'ch3cf3',
    label: (
      <>
        CH<sub>3</sub>CF<sub>3</sub>
      </>
    ),
    ar5: 4800,
  },
  {
    value: 'ch2fch2f',
    label: (
      <>
        CH<sub>2</sub>FCH<sub>2</sub>F
      </>
    ),
    ar5: 16,
  },
  {
    value: 'ch3chf2',
    label: (
      <>
        CH<sub>3</sub>CHF<sub>2</sub>
      </>
    ),
    ar5: 138,
  },
  {
    value: 'ch3ch2f',
    label: (
      <>
        CH<sub>3</sub>CH<sub>2</sub>F
      </>
    ),
    ar5: 4,
  },
  {
    value: 'cf3chfcf3',
    label: (
      <>
        CF<sub>3</sub>CHFCF<sub>3</sub>
      </>
    ),
    ar5: 3350,
  },
  {
    value: 'ch2fcf2cf3',
    label: (
      <>
        CH<sub>2</sub>FCF<sub>2</sub>CF<sub>3</sub>
      </>
    ),
    ar5: 1210,
  },
  {
    value: 'chf2chfcf3',
    label: (
      <>
        CHF<sub>2</sub>CHFCF<sub>3</sub>
      </>
    ),
    ar5: 1330,
  },
  {
    value: 'cf3ch2cf3',
    label: (
      <>
        CF<sub>3</sub>CH<sub>2</sub>CF<sub>3</sub>
      </>
    ),
    ar5: 8060,
  },
  {
    value: 'ch2fcf2chf2',
    label: (
      <>
        CH<sub>2</sub>FCF<sub>2</sub>CHF<sub>2</sub>
      </>
    ),
    ar5: 716,
  },
  {
    value: 'chf2ch2cf3',
    label: (
      <>
        CHF<sub>2</sub>CH<sub>2</sub>CF<sub>3</sub>
      </>
    ),
    ar5: 858,
  },
  {
    value: 'ch3cf2ch2cf3',
    label: (
      <>
        CH<sub>3</sub>CF<sub>2</sub>CH<sub>2</sub>CF<sub>3</sub>
      </>
    ),
    ar5: 804,
  },
  {
    value: 'cf3chfchfcf2cf3',
    label: (
      <>
        CF<sub>3</sub>CHFCHFCF<sub>2</sub>CF<sub>3</sub>
      </>
    ),
    ar5: 1650,
  },
  // Perfluorinated compounds
  {
    value: 'sf6',
    label: (
      <>
        SF<sub>6</sub>
      </>
    ),
    ar5: 23500,
  },
  {
    value: 'nf3',
    label: (
      <>
        NF<sub>3</sub>
      </>
    ),
    ar5: 16100,
  },
  {
    value: 'cf4',
    label: (
      <>
        CF<sub>4</sub>
      </>
    ),
    ar5: 6630,
  },
  {
    value: 'c2f6',
    label: (
      <>
        C<sub>2</sub>F<sub>6</sub>
      </>
    ),
    ar5: 11100,
  },
  {
    value: 'c3f8',
    label: (
      <>
        C<sub>3</sub>F<sub>8</sub>
      </>
    ),
    ar5: 8900,
  },
  {
    value: 'c-c4f8',
    label: (
      <>
        c-C<sub>4</sub>F<sub>8</sub>
      </>
    ),
    ar5: 9540,
  },
  {
    value: 'c4f10',
    label: (
      <>
        C<sub>4</sub>F<sub>10</sub>
      </>
    ),
    ar5: 9200,
  },
  {
    value: 'c5f12',
    label: (
      <>
        C<sub>5</sub>F<sub>12</sub>
      </>
    ),
    ar5: 8550,
  },
  {
    value: 'c6f14',
    label: (
      <>
        C<sub>6</sub>F<sub>14</sub>
      </>
    ),
    ar5: 7910,
  },
  {
    value: 'c10f18',
    label: (
      <>
        C<sub>10</sub>F<sub>18</sub>
      </>
    ),
    ar5: 7190,
  },
  {
    value: 'sf5cf3',
    label: (
      <>
        SF<sub>5</sub>CF<sub>3</sub>
      </>
    ),
    ar5: 17400,
  },
  {
    value: 'c-c3f6',
    label: (
      <>
        c-C<sub>3</sub>F<sub>6</sub>
      </>
    ),
    ar5: 9200,
  },
  // Fluorinated ethers
  {
    value: 'chf2ocf3',
    label: (
      <>
        CHF<sub>2</sub>OCF<sub>3</sub>
      </>
    ),
    ar5: 12400,
  },
  {
    value: 'chf2ochf2',
    label: (
      <>
        CHF<sub>2</sub>OCHF<sub>2</sub>
      </>
    ),
    ar5: 5560,
  },
  {
    value: 'ch3ocf3',
    label: (
      <>
        CH<sub>3</sub>OCF<sub>3</sub>
      </>
    ),
    ar5: 523,
  },
  {
    value: 'chf2ochclcf3',
    label: (
      <>
        CHF<sub>2</sub>OCHClCF<sub>3</sub>
      </>
    ),
    ar5: 491,
  },
  {
    value: 'ch3ocf2cf3',
    label: (
      <>
        CH<sub>3</sub>OCF<sub>2</sub>CF<sub>3</sub>
      </>
    ),
    ar5: 654,
  },
  {
    value: 'chf2och2cf3',
    label: (
      <>
        CHF<sub>2</sub>OCH<sub>2</sub>CF<sub>3</sub>
      </>
    ),
    ar5: 812,
  },
  {
    value: 'ch3ocf2cf2cf3',
    label: (
      <>
        CH<sub>3</sub>OCF<sub>2</sub>CF<sub>2</sub>CF<sub>3</sub>
      </>
    ),
    ar5: 530,
  },
  {
    value: 'chf2cf2och2cf3',
    label: (
      <>
        CHF<sub>2</sub>CF<sub>2</sub>OCH<sub>2</sub>CF<sub>3</sub>
      </>
    ),
    ar5: 889,
  },
  {
    value: 'ch3ocf2cf2chf2',
    label: (
      <>
        CH<sub>3</sub>OCF<sub>2</sub>CF<sub>2</sub>CHF<sub>2</sub>
      </>
    ),
    ar5: 413,
  },
  {
    value: 'c4f9och3',
    label: (
      <>
        C<sub>4</sub>F<sub>9</sub>OCH<sub>3</sub>
      </>
    ),
    ar5: 421,
  },
  {
    value: 'c4f9oc2h5',
    label: (
      <>
        C<sub>4</sub>F<sub>9</sub>OC<sub>2</sub>H<sub>5</sub>
      </>
    ),
    ar5: 57,
  },
  {
    value: 'chf2ocf2oc2f4ochf2',
    label: (
      <>
        CHF<sub>2</sub>OCF<sub>2</sub>OC<sub>2</sub>F<sub>4</sub>OCHF
        <sub>2</sub>
      </>
    ),
    ar5: 2820,
  },
  {
    value: 'chf2ocf2ochf2',
    label: (
      <>
        CHF<sub>2</sub>OCF<sub>2</sub>OCHF<sub>2</sub>
      </>
    ),
    ar5: 5350,
  },

  {
    value: 'chf2ocf2cf2ochf2',
    label: (
      <>
        CHF<sub>2</sub>OCF<sub>2</sub>CF<sub>2</sub>OCHF<sub>2</sub>
      </>
    ),
    ar5: 2910,
  },
  {
    value: 'cf3chfocf3',
    label: (
      <>
        CF<sub>3</sub>CHFOCF<sub>3</sub>
      </>
    ),
    ar5: 6450,
  },
  {
    value: 'chf2ochfcf3',
    label: (
      <>
        CHF<sub>2</sub>OCHFCF<sub>3</sub>
      </>
    ),
    ar5: 1790,
  },
  {
    value: 'cf3ch2ocf3',
    label: (
      <>
        CF<sub>3</sub>CH<sub>2</sub>OCF<sub>3</sub>
      </>
    ),
    ar5: 979,
  },
  {
    value: 'chf2ch2ocf3',
    label: (
      <>
        CHF<sub>2</sub>CH<sub>2</sub>OCF<sub>3</sub>
      </>
    ),
    ar5: 828,
  },
  {
    value: 'cf3ch2och3',
    label: (
      <>
        CF<sub>3</sub>CH<sub>2</sub>OCH<sub>3</sub>
      </>
    ),
    ar5: 1,
  },
  {
    value: 'chf2cf2ocf2cf3',
    label: (
      <>
        CHF<sub>2</sub>CF<sub>2</sub>OCF<sub>2</sub>CF<sub>3</sub>
      </>
    ),
    ar5: 3070,
  },
  {
    value: 'cf3ch2ocf2cf3',
    label: (
      <>
        CF<sub>3</sub>CH<sub>2</sub>OCF<sub>2</sub>CF<sub>3</sub>
      </>
    ),
    ar5: 929,
  },
  {
    value: 'chf2ch2ocf2cf3',
    label: (
      <>
        CHF<sub>2</sub>CH<sub>2</sub>OCF<sub>2</sub>CF<sub>3</sub>
      </>
    ),
    ar5: 854,
  },
  {
    value: 'ch3ocf2chfcf3',
    label: (
      <>
        CH<sub>3</sub>OCF<sub>2</sub>CHFCF<sub>3</sub>
      </>
    ),
    ar5: 387,
  },
  {
    value: 'chf2ch2ocf2chf2',
    label: (
      <>
        CHF<sub>2</sub>CH<sub>2</sub>OCF<sub>2</sub>CHF<sub>2</sub>
      </>
    ),
    ar5: 719,
  },
  {
    value: 'chf2och2cf2chf2',
    label: (
      <>
        CHF<sub>2</sub>OCH<sub>2</sub>CF<sub>2</sub>CHF<sub>2</sub>
      </>
    ),
    ar5: 446,
  },
  {
    value: 'cf3cf2ch2och3',
    label: (
      <>
        CF<sub>3</sub>CF<sub>2</sub>CH<sub>2</sub>OCH<sub>3</sub>
      </>
    ),
    ar5: 1,
  },
  {
    value: 'chf2cf2och2ch3',
    label: (
      <>
        CHF<sub>2</sub>CF<sub>2</sub>OCH<sub>2</sub>CH<sub>3</sub>
      </>
    ),
    ar5: 627,
  },
  // Perfluoropolyethers
  {
    value: 'cf3ocf(cf3)cf2ocf2ocf3',
    label: (
      <>
        CF<sub>3</sub>OCF(CF<sub>3</sub>)CF<sub>2</sub>OCF<sub>2</sub>OCF
        <sub>3</sub>
      </>
    ),
    ar5: 9710,
  },
  // Hydrocarbons and other compounds - direct effects
  {
    value: 'chcl3',
    label: (
      <>
        CHCl<sub>3</sub>
      </>
    ),
    ar5: 16,
  },
  {
    value: 'ch2cl2',
    label: (
      <>
        CH<sub>2</sub>Cl<sub>2</sub>
      </>
    ),
    ar5: 9,
  },
  {
    value: 'ch3cl',
    label: (
      <>
        CH<sub>3</sub>Cl
      </>
    ),
    ar5: 12,
  },
  {
    value: 'chbrf2',
    label: (
      <>
        CHBrF<sub>2</sub>
      </>
    ),
    ar5: 376,
  },
]

export const convertChemicalToString = (
  jsx: JSX.Element | string | undefined,
) => {
  if (!jsx || typeof jsx === 'string') return ''

  const stringWithTags = reactElementToJSXString(jsx, {
    showDefaultProps: false,
    filterProps: ['children'],
    showFunctions: false,
  })
  const chemicalString = stringWithTags.replace(
    /<sub>|<\/sub>|<>|<\/>|\s|\r?\n/g,
    '',
  )

  return chemicalString.toLowerCase()
}
