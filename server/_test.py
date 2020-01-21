from scipy.spatial.transform import Rotation as R

ori = ['-0.555', '-0.457', '-0.568', '0.399']
ori = [float(i) for i in ori]
r = R.from_quat(['-0.555', '-0.457', '-0.568', '0.399'])